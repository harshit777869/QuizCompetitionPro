const express=require("express");
const session=require("express-session");
const path=require("path");
const db=require("../database/db");

const app=express();
const PORT=process.env.PORT||3000;
app.set("trust proxy",1);
app.use((req,res,next)=>{
 const origin=req.headers.origin;
 if(origin==='null' || origin==='http://localhost:3000' || origin==='http://127.0.0.1:3000'){
  res.setHeader('Access-Control-Allow-Origin',origin);
  res.setHeader('Access-Control-Allow-Credentials','true');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
 }
 if(req.method==='OPTIONS') return res.sendStatus(204);
 next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret:process.env.SESSION_SECRET||"qcp-2026-secret",resave:false,saveUninitialized:false,cookie:{maxAge:8*60*60*1000,httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production"}}));
app.use(express.static(path.join(__dirname,"../frontend")));

const student=(req,res,next)=>req.session.user?next():res.status(401).json({error:"Please login first"});
const admin=(req,res,next)=>req.session.admin?next():res.status(401).json({error:"Admin login required"});

app.get("/api/health",(req,res)=>res.json({ok:true,database:"sqlite",time:new Date().toISOString()}));
app.get("/api/session",(req,res)=>res.json({role:req.session.user?"student":req.session.admin?"admin":"guest",user:req.session.user||null,admin:req.session.admin||null}));

app.post("/api/auth/register",(req,res)=>{
 const {fullName,email,username,password,course}=req.body;
 if(!fullName||!email||!username||!password)return res.status(400).json({error:"Please fill all required fields."});
 try{
  const r=db.prepare("INSERT INTO users(full_name,email,username,password,course) VALUES(?,?,?,?,?)").run(fullName.trim(),email.trim(),username.trim(),password,course||"Computer Science");
  req.session.user={id:Number(r.lastInsertRowid),fullName:fullName.trim(),username:username.trim()};
  res.json({ok:true,user:req.session.user});
 }catch(e){res.status(400).json({error:e.message.includes("UNIQUE")?"Username or email already exists.":"Registration failed."})}
});
app.post("/api/auth/login",(req,res)=>{
 const {identity,password}=req.body;
 const u=db.prepare("SELECT id,full_name,username,email,course FROM users WHERE (username=? OR email=?) AND password=?").get(identity,identity,password);
 if(!u)return res.status(401).json({error:"Invalid username/email or password."});
 req.session.user={id:u.id,fullName:u.full_name,username:u.username};
 res.json({ok:true,user:req.session.user});
});
app.post("/api/auth/admin",(req,res)=>{
 const {username,password}=req.body;
 const a=db.prepare("SELECT id,username FROM admins WHERE username=? AND password=?").get(username,password);
 if(!a)return res.status(401).json({error:"Unauthorized access is not allowed."});
 req.session.admin={id:a.id,username:a.username};res.json({ok:true,admin:req.session.admin});
});
app.post("/api/auth/logout",(req,res)=>req.session.destroy(()=>res.json({ok:true})));

app.get("/api/dashboard",student,(req,res)=>{
 const id=req.session.user.id;
 const u=db.prepare("SELECT id,full_name,email,username,course,created_at FROM users WHERE id=?").get(id);
 const modules=db.prepare("SELECT id,title,description,icon,question_count FROM modules ORDER BY id").all();
 const totalQuestions=db.prepare("SELECT COUNT(*) c FROM questions").get().c;
 const points=db.prepare("SELECT COALESCE(SUM(score),0) p FROM attempts WHERE user_id=?").get(id).p;
 const ranks=db.prepare("SELECT user_id,COALESCE(SUM(score),0) p FROM attempts GROUP BY user_id ORDER BY p DESC").all();
 const rank=(ranks.findIndex(x=>x.user_id===id)+1)||1;
 const activity=db.prepare("SELECT a.score,a.total,m.title,a.created_at FROM attempts a JOIN modules m ON m.id=a.module_id WHERE a.user_id=? ORDER BY a.id DESC LIMIT 5").all(id);
 res.json({user:u,modules,totalModules:modules.length,totalQuestions,points,rank,activity});
});
app.get("/api/modules",student,(req,res)=>res.json(db.prepare("SELECT id,title,description,icon,question_count FROM modules ORDER BY id").all()));
app.get("/api/quiz/:id",student,(req,res)=>{
 const m=db.prepare("SELECT id,title,description FROM modules WHERE id=?").get(req.params.id);
 if(!m)return res.status(404).json({error:"Quiz module not found."});
 const q=db.prepare("SELECT id,question,option_a,option_b,option_c,option_d FROM questions WHERE module_id=? ORDER BY id").all(req.params.id);
 res.json({module:m,questions:q});
});
app.post("/api/quiz/:id/submit",student,(req,res)=>{
 const qs=db.prepare("SELECT id,correct_answer FROM questions WHERE module_id=? ORDER BY id").all(req.params.id);
 let score=0;const answers=req.body.answers||{};
 qs.forEach(q=>{if(String(answers[q.id]||"").toUpperCase()===q.correct_answer)score++});
 db.prepare("INSERT INTO attempts(user_id,module_id,score,total) VALUES(?,?,?,?)").run(req.session.user.id,req.params.id,score,qs.length);
 const percentage=qs.length?Math.round(score/qs.length*100):0;
 res.json({score,total:qs.length,percentage,certificate:percentage>=60});
});
app.get("/api/results",student,(req,res)=>res.json(db.prepare("SELECT a.id,m.title,a.score,a.total,a.created_at FROM attempts a JOIN modules m ON m.id=a.module_id WHERE a.user_id=? ORDER BY a.id DESC").all(req.session.user.id)));
app.get("/api/leaderboard",student,(req,res)=>res.json(db.prepare("SELECT u.full_name,COALESCE(SUM(a.score),0) points,COUNT(a.id) quizzes FROM users u LEFT JOIN attempts a ON a.user_id=u.id GROUP BY u.id ORDER BY points DESC,quizzes DESC LIMIT 20").all()));
app.get("/api/profile",student,(req,res)=>res.json(db.prepare("SELECT id,full_name,email,username,course,created_at FROM users WHERE id=?").get(req.session.user.id)));
app.put("/api/profile",student,(req,res)=>{
 const {fullName,email,course}=req.body;
 db.prepare("UPDATE users SET full_name=?,email=?,course=? WHERE id=?").run(fullName,email,course,req.session.user.id);
 req.session.user.fullName=fullName;res.json({ok:true});
});
app.get("/api/certificates",student,(req,res)=>res.json(db.prepare("SELECT a.id,m.title,a.score,a.total,a.created_at FROM attempts a JOIN modules m ON m.id=a.module_id WHERE a.user_id=? AND a.score*1.0/a.total>=.6 ORDER BY a.id DESC").all(req.session.user.id)));
function certificateRecord(req,res){
 const r=db.prepare("SELECT a.id,m.title,a.score,a.total,a.created_at,u.id student_id,u.full_name FROM attempts a JOIN modules m ON m.id=a.module_id JOIN users u ON u.id=a.user_id WHERE a.id=? AND a.user_id=? AND a.score*1.0/a.total>=.6").get(req.params.id,req.session.user.id);
 if(!r){res.status(404).send("Certificate not found.");return null;}
 return r;
}
function certIdFor(r){return `QCP-CERT-${new Date(r.created_at).getFullYear()}-${String(r.id).padStart(5,"0")}`}
function pdfText(s){return String(s||"").replace(/[\\()\r\n]/g," ").replace(/[^\\x20-\\x7E]/g,"?").replace(/[()\\]/g,m=>"\\"+m)}
function wrapPdfText(text,maxChars){
 const words=String(text||"").split(/\s+/); const out=[]; let line="";
 for(const w of words){ if(!line){line=w;continue;} if((line+" "+w).length<=maxChars) line+=" "+w; else {out.push(line);line=w;} }
 if(line)out.push(line); return out.length?out:[""];
}

// PDF uses the exact same 842x595 A4-landscape coordinate system as the browser certificate view.
app.get("/api/certificates/:id/pdf",student,(req,res)=>{
 const r=certificateRecord(req,res); if(!r)return;
 const certId=certIdFor(r), pct=Math.round(r.score*100/r.total);
 const issued=new Date(r.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
 const titleLines=wrapPdfText(r.title,42).slice(0,2);
 const name=String(r.full_name||"Student").replace(/[^\\x20-\\x7E]/g,"?");
 const lines=[];
 const add=(font,size,x,y,text)=>lines.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfText(text)}) Tj ET`);
 // Background + two borders, matching browser CSS.
 lines.push("q 1 1 1 rg 0 0 842 595 re f Q");
 lines.push("0.063 0.169 0.325 RG 5 w 45 38 752 519 re S");
 lines.push("0.843 0.659 0.247 RG 2 w 57 50 728 495 re S");
 add("F1",18,0,0,""); // placeholder removed below
 lines.pop();
 // Centered text helper in PDF coordinates.
 const centered=(font,size,y,text)=>{
   const clean=String(text||"").replace(/[^\\x20-\\x7E]/g,"?");
   const approx=clean.length*size*0.48; const x=Math.max(40,(842-approx)/2);
   add(font,size,x,y,clean);
 };
 centered("F1",22,522,"Quiz Competition Pro");
 centered("F2",31,478,"Certificate of Achievement");
 centered("F1",10,452,"EXCELLENCE - KNOWLEDGE - ACHIEVEMENT");
 centered("F1",11,414,"This certificate is proudly presented to");
 centered("F2",28,374,name);
 lines.push("0.843 0.659 0.247 RG 2 w 170 360 502 0 re S");
 centered("F1",11,335,"for successfully completing the quiz competition");
 let ty=304;
 for(const tl of titleLines){centered("F2",18,ty,tl);ty-=24;}
 centered("F1",15,248,`Final Score: ${r.score}/${r.total}  |  ${pct}%`);
 centered("F1",10,205,`Student ID: ${r.student_id}`);
 centered("F1",10,183,`Certificate ID: ${certId}`);
 centered("F1",10,161,`Issued On: ${issued}`);
 // Seal, matching the visual certificate.
 lines.push("0.843 0.659 0.247 RG 3 w 705 72 58 58 re S");
 centered("F2",18,93,"*");
 lines.push("0.45 0.45 0.45 rg");
 centered("F1",7,52,"Awarded by Quiz Competition Pro - This certificate recognizes successful completion of the assessment.");
 const stream=lines.join("\n");
 const objs=[];
 objs.push("1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj");
 objs.push("2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj");
 objs.push("3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>endobj");
 objs.push("4 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj");
 objs.push("5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>endobj");
 objs.push(`6 0 obj<< /Length ${Buffer.byteLength(stream,"ascii")} >>stream\n${stream}\nendstream\nendobj`);
 let pdf="%PDF-1.4\n"; const offsets=[0];
 for(const o of objs){offsets.push(Buffer.byteLength(pdf,"ascii"));pdf+=o+"\n";}
 const xref=Buffer.byteLength(pdf,"ascii"); pdf+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`;
 for(let i=1;i<offsets.length;i++)pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";
 pdf+=`trailer<< /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
 res.setHeader("Content-Type","application/pdf");
 res.setHeader("Content-Disposition",`attachment; filename="${certId}.pdf"`);
 res.setHeader("Content-Length",Buffer.byteLength(pdf,"ascii"));
 res.send(Buffer.from(pdf,"ascii"));
});

app.get("/certificate/:id",student,(req,res)=>{
 const r=certificateRecord(req,res); if(!r)return;
 const certId=certIdFor(r), pct=Math.round(r.score*100/r.total);
 const issued=new Date(r.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
 const esc=s=>String(s||"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\\\"":"&quot;"}[c]||c));
 res.send(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(certId)} - Certificate</title><style>
 *{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,sans-serif}body{background:#06152c;color:#102b55}.toolbar{padding:14px;text-align:center}.toolbar a{display:inline-block;margin:4px;padding:10px 15px;border-radius:8px;text-decoration:none;font-weight:700;background:#19c5ff;color:#06152c}.toolbar a.secondary{background:#fff}.stage{width:100%;overflow:auto;padding:10px 0 30px}.page{position:relative;width:842px;height:595px;margin:0 auto;background:#fff;border:5px solid #102b55;outline:2px solid #d7a83f;outline-offset:-12px;text-align:center;box-shadow:0 20px 50px #0006;overflow:hidden}.brand{position:absolute;top:52px;left:0;width:100%;font-size:22px;font-weight:800}.title{position:absolute;top:84px;left:0;width:100%;font:31px Georgia,serif;font-weight:700}.sub{position:absolute;top:132px;left:0;width:100%;color:#9a741b;font-size:10px;letter-spacing:2px}.present{position:absolute;top:171px;left:0;width:100%;color:#666;font-size:11px}.name{position:absolute;top:202px;left:35px;width:772px;font:28px Georgia,serif;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.line{position:absolute;top:231px;left:170px;width:502px;height:2px;background:#d7a83f}.body{position:absolute;top:255px;left:0;width:100%;font-size:11px;color:#555}.quiz{position:absolute;top:281px;left:65px;width:712px;font:18px Georgia,serif;font-weight:700;line-height:24px;max-height:48px;overflow:hidden}.score{position:absolute;top:335px;left:0;width:100%;font-size:15px;font-weight:700;color:#087cff}.meta{position:absolute;top:383px;left:0;width:100%;font-size:10px;color:#444;line-height:22px}.seal{position:absolute;right:75px;bottom:72px;width:58px;height:58px;border:3px solid #d7a83f;border-radius:50%;display:grid;place-items:center;color:#d7a83f;font:bold 18px Georgia}.footer{position:absolute;left:40px;right:40px;bottom:48px;font-size:7px;color:#777}.logo{position:absolute;top:22px;left:0;width:100%;font-size:22px}
 @media(max-width:900px){.stage{padding-left:10px;padding-right:10px}.page{transform-origin:top left;transform:scale(calc((100vw - 20px)/842));margin-bottom:calc(595px * (1 - ((100vw - 20px)/842)));}.toolbar{position:sticky;top:0;z-index:5;background:#06152c}}
 @media print{html,body{background:#fff!important}.toolbar{display:none!important}.stage{padding:0!important;overflow:visible!important}.page{transform:none!important;width:842px!important;height:595px!important;margin:0!important;box-shadow:none!important;outline:none!important}@page{size:A4 landscape;margin:0}}
 </style></head><body><div class="toolbar"><a href="/api/certificates/${r.id}/pdf">📄 Download PDF</a><a class="secondary" href="javascript:window.print()">🖨️ Print / Save PDF</a></div><div class="stage"><div class="page"><div class="logo">*</div><div class="brand">Quiz Competition Pro</div><div class="title">Certificate of Achievement</div><div class="sub">EXCELLENCE - KNOWLEDGE - ACHIEVEMENT</div><div class="present">This certificate is proudly presented to</div><div class="name">${esc(r.full_name)}</div><div class="line"></div><div class="body">for successfully completing the quiz competition</div><div class="quiz">${esc(r.title)}</div><div class="score">Final Score: ${r.score}/${r.total} &nbsp; | &nbsp; ${pct}%</div><div class="meta"><b>Student ID:</b> ${esc(r.student_id)}<br><b>Certificate ID:</b> ${esc(certId)}<br><b>Issued On:</b> ${esc(issued)}</div><div class="seal">*</div><div class="footer">Awarded by Quiz Competition Pro - This certificate recognizes successful completion of the assessment.</div></div></div></body></html>`);
});

app.get("/api/admin/stats",admin,(req,res)=>res.json({
 students:db.prepare("SELECT COUNT(*) c FROM users").get().c,
 modules:db.prepare("SELECT COUNT(*) c FROM modules").get().c,
 questions:db.prepare("SELECT COUNT(*) c FROM questions").get().c,
 attempts:db.prepare("SELECT COUNT(*) c FROM attempts").get().c
}));
app.get("/api/admin/attempts",admin,(req,res)=>{
 const q=String(req.query.q||"").trim();
 const sql=`SELECT a.id AS attempt_id,u.id AS student_id,u.full_name,u.username,u.email,m.id AS module_id,m.title,a.score,a.total,ROUND(a.score*100.0/a.total,0) AS percentage,a.created_at
 FROM attempts a JOIN users u ON u.id=a.user_id JOIN modules m ON m.id=a.module_id
 ${q?"WHERE CAST(u.id AS TEXT)=? OR u.username LIKE ? OR u.email LIKE ? OR u.full_name LIKE ?":""}
 ORDER BY a.id DESC`;
 const rows=q?db.prepare(sql).all(q,`%${q}%`,`%${q}%`,`%${q}%`):db.prepare(sql).all();
 res.json(rows);
});
app.get("/api/admin/modules",admin,(req,res)=>res.json(db.prepare("SELECT * FROM modules ORDER BY id").all()));
app.post("/api/admin/modules",admin,(req,res)=>{
 const {title,description,icon}=req.body;
 if(!title)return res.status(400).json({error:"Module title is required."});
 const r=db.prepare("INSERT INTO modules(title,description,icon,question_count) VALUES(?,?,?,0)").run(title,description||"",icon||"📘");
 res.json({ok:true,id:Number(r.lastInsertRowid)});
});
app.delete("/api/admin/modules/:id",admin,(req,res)=>{db.prepare("DELETE FROM modules WHERE id=?").run(req.params.id);res.json({ok:true})});
app.get("/api/admin/questions/:moduleId",admin,(req,res)=>res.json(db.prepare("SELECT * FROM questions WHERE module_id=? ORDER BY id").all(req.params.moduleId)));
app.post("/api/admin/questions",admin,(req,res)=>{
 const {moduleId,question,a,b,c,d,correct}=req.body;
 if(!moduleId||!question||!a||!b||!c||!d||!correct)return res.status(400).json({error:"Fill all question fields."});
 db.prepare("INSERT INTO questions(module_id,question,option_a,option_b,option_c,option_d,correct_answer) VALUES(?,?,?,?,?,?,?)").run(moduleId,question,a,b,c,d,correct);
 db.prepare("UPDATE modules SET question_count=(SELECT COUNT(*) FROM questions WHERE module_id=?) WHERE id=?").run(moduleId,moduleId);
 res.json({ok:true});
});
app.delete("/api/admin/questions/:id",admin,(req,res)=>{
 const q=db.prepare("SELECT module_id FROM questions WHERE id=?").get(req.params.id);
 db.prepare("DELETE FROM questions WHERE id=?").run(req.params.id);
 if(q)db.prepare("UPDATE modules SET question_count=(SELECT COUNT(*) FROM questions WHERE module_id=?) WHERE id=?").run(q.module_id,q.module_id);
 res.json({ok:true});
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"../frontend/index.html")));
const server=app.listen(PORT,()=>console.log(`Quiz Competition Pro: http://localhost:${PORT}`));
server.on("error",err=>{
 if(err.code==="EADDRINUSE") console.error(`Port ${PORT} is already in use. If Quiz Competition Pro is already running, open http://localhost:${PORT}`);
 else console.error(err);
});

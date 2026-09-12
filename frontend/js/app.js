const app=document.getElementById("app");
let S={role:null,user:null,page:"dashboard",quiz:null,moduleId:null,answers:{},qIndex:0,seconds:600,result:null,timer:null,submitting:false};
const API_BASE=location.protocol==="file:"?"http://localhost:3000":"";

const nav=[
 ["dashboard","🏠","Dashboard"],["profile","👤","My Profile"],["take","📝","Take Quiz"],
 ["leaderboard","🏆","Leaderboard"],["results","📊","Results"],["certificates","🎓","Certificates"],["settings","⚙️","Settings"]
];
const esc=x=>String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
async function api(url,opt={}){const r=await fetch(API_BASE+url,{credentials:"include",headers:{"Content-Type":"application/json"},...opt});const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.error||"Request failed");return d}
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.style.cssText="position:fixed;right:20px;bottom:20px;padding:12px 18px;background:#087cff;color:white;border-radius:10px;z-index:99;box-shadow:0 8px 25px #0008";setTimeout(()=>x.style.display="none",2200)}
function authScreen(){
 app.innerHTML=`<div class="auth"><div class="auth-card"><div class="brand"><div class="brand-icon">🏆</div><h1>Quiz Competition Pro</h1><p>Learn • Compete • Grow</p></div>
 <div class="tabs"><button id="studentTab" class="active">↪ Student Login</button><button id="adminTab">🛡 Admin Login</button></div><div id="authBox"></div></div></div>`;
 studentLogin();studentTab.onclick=studentLogin;adminTab.onclick=adminLogin;
}
function studentLogin(){
 studentTab.classList.add("active");adminTab.classList.remove("active");
 authBox.innerHTML=`<h2 class="title">Student Login</h2><form id="login"><div class="field"><input name="identity" placeholder="👤  Username or Email" required></div><div class="field"><input name="password" type="password" placeholder="🔒  Password" required></div><div id="err" class="error"></div><button class="primary">↪ Login</button></form><p class="muted">Don't have an account? <span class="link" id="reg">Register here</span></p>`;
 login.onsubmit=async e=>{e.preventDefault();try{const d=await api("/api/auth/login",{method:"POST",body:JSON.stringify(Object.fromEntries(new FormData(login)))});S={...S,role:"student",user:d.user,page:"dashboard"};render()}catch(e){err.textContent=e.message}};
 reg.onclick=register;
}
function adminLogin(){
 studentTab.classList.remove("active");adminTab.classList.add("active");
 authBox.innerHTML=`<h2 class="title">Admin Login</h2><form id="login"><div class="field"><input name="username" placeholder="🛡  Admin Username" required></div><div class="field"><input name="password" type="password" placeholder="🔒  Password" required></div><div id="err" class="error"></div><button class="primary">🛡 Login</button></form><p class="muted">Unauthorized access is not allowed.</p>`;
 login.onsubmit=async e=>{e.preventDefault();try{const d=await api("/api/auth/admin",{method:"POST",body:JSON.stringify(Object.fromEntries(new FormData(login)))});S={...S,role:"admin",user:d.admin,page:"admin"};render()}catch(e){err.textContent=e.message}};
}
function register(){
 authBox.innerHTML=`<h2 class="title">Create Account</h2><form id="regForm"><div class="field"><input name="fullName" placeholder="👤  Full Name" required></div><div class="field"><input name="email" type="email" placeholder="✉  Email Address" required></div><div class="field"><input name="username" placeholder="👤  Username" required></div><div class="field"><input name="password" type="password" placeholder="🔒  Password" required></div><div class="field"><input name="confirm" type="password" placeholder="🔒  Confirm Password" required></div><div class="field"><select name="course"><option>Computer Science</option><option>Information Technology</option><option>Electronics</option><option>Mechanical</option><option>Other</option></select></div><div id="err" class="error"></div><button class="primary">👤+ Register</button></form><p class="muted">Already have an account? <span class="link" id="backLogin">Login here</span></p>`;
 regForm.onsubmit=async e=>{e.preventDefault();const o=Object.fromEntries(new FormData(regForm));if(o.password!==o.confirm)return err.textContent="Passwords do not match.";delete o.confirm;try{const d=await api("/api/auth/register",{method:"POST",body:JSON.stringify(o)});S={...S,role:"student",user:d.user,page:"dashboard"};render()}catch(e){err.textContent=e.message}};backLogin.onclick=studentLogin;
}
function shell(content){
 app.innerHTML=`<div class="layout"><aside class="sidebar"><div class="side-brand"><span class="icon">🏆</span><div><strong>Quiz Competition Pro</strong><small>Learn • Compete • Grow</small></div></div><nav class="nav">${nav.map(n=>`<button class="${S.page===n[0]?"active":""}" data-page="${n[0]}">${n[1]} &nbsp; ${n[2]}</button>`).join("")}</nav><div class="progress-box">🏆 &nbsp; <b>Small Steps</b><br><span>Make Big Progress</span><div class="bar"><i></i></div></div></aside><main class="main"><header class="topbar"><input class="search" placeholder="⌕  Search modules, topics..."><div class="top-right"><span class="hide-mobile">🌙 Dark Mode</span><span>🔔</span><div class="mini"><span class="avatar">👤</span><span class="hide-mobile"><b>${esc(S.user.fullName||"Student")}</b><br>Student</span></div><button class="btn" id="logout">Logout</button></div></header><section class="content" id="content">${content}</section></main></div>`;
 document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>{S.page=b.dataset.page;render()});
 logout.onclick=async()=>{await api("/api/auth/logout",{method:"POST"});S={role:null,user:null,page:"dashboard"};authScreen()};
}
async function dashboard(){
 const d=await api("/api/dashboard");
 shell(`<div class="welcome"><h2>Welcome Back, ${esc(d.user.full_name)}! 👋</h2><p>Ready to test your knowledge? Choose a quiz module and start your journey.</p></div>
 <div class="stats"><div class="stat"><span class="stat-icon">📖</span><div><small>Total Modules</small><b>${d.totalModules}</b><small>Explore all quiz categories</small></div></div><div class="stat"><span class="stat-icon">❓</span><div><small>Total Questions</small><b>${d.totalQuestions}</b><small>10 questions per module</small></div></div><div class="stat"><span class="stat-icon">🏆</span><div><small>Your Rank</small><b>#${d.rank}</b><small>Keep going!</small></div></div><div class="stat"><span class="stat-icon">⭐</span><div><small>Total Points</small><b>${d.points}</b><small>Earn more, climb higher!</small></div></div></div>
 <div class="two-col"><div class="panel"><div class="panel-head"><h3>▦ Quiz Modules</h3><small>${d.totalModules} Modules Available</small></div><div class="modules">${d.modules.slice(0,8).map(card).join("")}</div><button class="btn primary-btn" style="display:block;margin:12px auto 0" onclick="S.page='take';render()">View All Modules →</button></div>
 <div class="panel"><div class="panel-head"><h3>◷ Recent Activity</h3></div>${d.activity.length?d.activity.map(a=>`<div class="activity"><span class="check">✓</span><div><b>You completed ${esc(a.title)}</b><br><small>Score: ${a.score}/${a.total} • ${new Date(a.created_at).toLocaleString()}</small></div></div>`).join(""):`<div class="empty">No quiz activity yet.</div>`}</div></div>`);
 bindCards();
}
function card(m){return `<div class="module" data-id="${m.id}"><span class="mi">${m.icon}</span><b>${m.id} &nbsp; ${esc(m.title)}</b><small>${m.question_count} Questions</small><span style="float:right">→</span></div>`}
function bindCards(){document.querySelectorAll(".module").forEach(x=>x.onclick=()=>startQuiz(x.dataset.id))}
async function modules(){
 const ms=await api("/api/modules");shell(`<h1 class="page-title">Quiz Modules</h1><div class="panel"><div class="modules">${ms.map(card).join("")}</div></div>`);bindCards();
}
async function startQuiz(id){
 S.moduleId=id;S.quiz=await api("/api/quiz/"+id);S.answers={};S.qIndex=0;S.seconds=600;S.page="quiz";render().catch(e=>{
  console.error(e);
  app.innerHTML=`<div class="auth"><div class="auth-card"><div class="brand"><div class="brand-icon">🏆</div><h1>Quiz Competition Pro</h1><p>Application error</p></div><div class="error" style="display:block;margin:18px 0">${esc(e.message||e)}</div><button class="primary" onclick="location.reload()">Reload Application</button></div></div>`;
});
}
function quiz(){
 clearInterval(S.timer);
 S.timer=setInterval(()=>{S.seconds--;const t=document.getElementById("timer");if(t)t.textContent=time(S.seconds);if(S.seconds<=0)submitQuiz()},1000);
 const q=S.quiz.questions[S.qIndex];
 const total=S.quiz.questions.length;
 const selected=S.answers[q.id]||"";
 app.innerHTML=`<div class="layout"><main class="main" style="margin-left:0"><section class="content"><div class="quiz-head"><div><button class="btn" onclick="clearInterval(S.timer);S.page='take';render()">← Modules</button><h1 class="page-title">${esc(S.quiz.module.title)}</h1></div><div class="timer" id="timer">${time(S.seconds)}</div></div><p>${esc(S.quiz.module.description)}</p><div class="panel" style="max-width:850px;margin:20px auto"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px"><b>Question ${S.qIndex+1} of ${total}</b><span style="color:#19c5ff">${Math.round(((S.qIndex+1)/total)*100)}% Complete</span></div><div class="bar" style="margin-bottom:22px"><i style="width:${((S.qIndex+1)/total)*100}%"></i></div><div class="q" style="margin:0"><div class="q-num">Question ${S.qIndex+1}</div><h3>${esc(q.question)}</h3><div class="options">${["A","B","C","D"].map(o=>`<div class="option ${selected===o?"selected":""}" data-q="${q.id}" data-a="${o}">${o}. ${esc(q["option_"+o.toLowerCase()])}</div>`).join("")}</div></div><div style="display:flex;justify-content:space-between;gap:12px;margin-top:18px"><button class="btn" onclick="clearInterval(S.timer);S.page='take';render()">Exit Quiz</button><button class="primary" id="nextBtn" style="width:auto;min-width:180px" ${selected?"":"disabled"}>${S.qIndex===total-1?"Save & Submit":"Save & Next →"}</button></div></div></section></main></div>`;
 document.querySelectorAll(".option").forEach(o=>o.onclick=()=>{document.querySelectorAll(`.option[data-q="${q.id}"]`).forEach(x=>x.classList.remove("selected"));o.classList.add("selected");S.answers[q.id]=o.dataset.a;const b=document.getElementById("nextBtn");if(b)b.disabled=false;});
 document.getElementById("nextBtn").onclick=()=>nextQuestion();
}
function nextQuestion(){
 const q=S.quiz.questions[S.qIndex];
 if(!S.answers[q.id]){toast("Please select an answer first.");return;}
 if(S.qIndex<S.quiz.questions.length-1){S.qIndex++;render();}else submitQuiz();
}
function time(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
async function submitQuiz(){if(!S.quiz||S.submitting)return;S.submitting=true;clearInterval(S.timer);try{S.result=await api("/api/quiz/"+S.moduleId+"/submit",{method:"POST",body:JSON.stringify({answers:S.answers})});S.page="result";render()}finally{S.submitting=false}}
function result(){const r=S.result;app.innerHTML=`<div class="layout"><main class="main" style="margin-left:0"><div class="content"><div class="result"><div style="font-size:45px">🏆</div><h1>Quiz Completed!</h1><div class="big-score">${r.score}/${r.total}</div><h2>${r.percentage}%</h2><p>${r.certificate?"🎓 Congratulations! You earned a certificate.":"Keep practicing and try again to reach 60%."}</p><button class="btn primary-btn" onclick="S.page='results';render()">View Results</button> <button class="btn" onclick="S.page='take';render()">Take Another Quiz</button></div></div></main></div>`}
async function results(){const rows=await api("/api/results");shell(`<h1 class="page-title">Results</h1><div class="panel"><table class="table"><tr><th>Quiz</th><th>Score</th><th>Percentage</th><th>Date</th></tr>${rows.length?rows.map(r=>`<tr><td>${esc(r.title)}</td><td>${r.score}/${r.total}</td><td>${Math.round(r.score/r.total*100)}%</td><td>${new Date(r.created_at).toLocaleString()}</td></tr>`).join(""):`<tr><td colspan="4" class="empty">No results yet.</td></tr>`}</table></div>`)}
async function leaderboard(){const rows=await api("/api/leaderboard");shell(`<h1 class="page-title">Leaderboard</h1><div class="panel"><table class="table"><tr><th>Rank</th><th>Student</th><th>Quizzes</th><th>Points</th></tr>${rows.map((r,i)=>`<tr><td>#${i+1}</td><td>${i<3?"🏆 ":""}${esc(r.full_name)}</td><td>${r.quizzes}</td><td>${r.points}</td></tr>`).join("")}</table></div>`)}
async function certificates(){
 const rows=await api("/api/certificates");
 shell(`<h1 class="page-title">Certificates</h1><div class="panel certificate-list">${rows.length?rows.map(r=>{
   const certId=certIdFor(r);
   return `<div class="certificate-row"><div class="certificate-badge">🎓</div><div class="certificate-info"><b>Certificate of Achievement</b><div>${esc(r.title)}</div><small>Score: ${r.score}/${r.total} • ${Math.round(r.score*100/r.total)}% • ${new Date(r.created_at).toLocaleString()}</small></div><a class="btn primary-btn cert-link" href="/certificate/${r.id}" target="_blank" rel="noopener">👁️ View Certificate</a><a class="btn cert-link" href="/api/certificates/${r.id}/pdf">📄 Download PDF</a></div>`
 }).join(""):`<div class="empty">Complete a quiz with at least 60% to earn a professional certificate.</div>`}</div>`);
}
function certIdFor(r){return `QCP-CERT-${new Date(r.created_at).getFullYear()}-${String(r.id).padStart(5,"0")}`}

async function profile(){const u=await api("/api/profile");shell(`<h1 class="page-title">My Profile</h1><div class="panel" style="max-width:720px"><p class="muted">Student ID: <b>${u.id}</b></p><form id="pf"><div class="form-grid"><div class="field"><input name="fullName" value="${esc(u.full_name)}"></div><div class="field"><input name="email" value="${esc(u.email)}"></div><div class="field"><input value="${esc(u.username)}" disabled></div><div class="field"><input name="course" value="${esc(u.course||"")}"></div></div><button class="primary">Save Profile</button></form></div>`);pf.onsubmit=async e=>{e.preventDefault();const o=Object.fromEntries(new FormData(pf));await api("/api/profile",{method:"PUT",body:JSON.stringify(o)});S.user.fullName=o.fullName;toast("Profile updated");render()}}
function settings(){shell(`<h1 class="page-title">Settings</h1><div class="panel"><h3>Appearance</h3><p>Dark Mode is enabled for Quiz Competition Pro.</p><h3>Account</h3><p>Update your personal details from My Profile.</p></div>`)}
async function adminLayout(){
 app.innerHTML=`<div class="layout"><aside class="sidebar"><div class="side-brand"><span class="icon">🛡️</span><div><strong>Quiz Competition Pro</strong><small>Admin Console</small></div></div><nav class="nav"><button class="active" onclick="adminHome()">📊 Dashboard</button><button onclick="adminModules()">📚 Modules</button><button onclick="adminQuestions()">❓ Questions</button><button onclick="adminAttempts()">🧾 Test Attempts</button><button onclick="adminLogout()">↪ Logout</button></nav></aside><main class="main"><header class="topbar"><b>Admin Control Center</b><div class="top-right">🛡 ${esc(S.user.username)}</div></header><section class="content" id="adminContent"></section></main></div>`;adminHome()
}
async function adminHome(){const s=await api("/api/admin/stats");const recent=await api("/api/admin/attempts");adminContent.innerHTML=`<h1 class="page-title">Dashboard</h1><div class="stats">${[["👨‍🎓","Students",s.students],["📚","Modules",s.modules],["❓","Questions",s.questions],["📝","Attempts",s.attempts]].map(x=>`<div class="stat"><span class="stat-icon">${x[0]}</span><div><small>${x[1]}</small><b>${x[2]}</b></div></div>`).join("")}</div><div class="panel" style="margin-top:15px"><div class="panel-head"><h3>Recent Test / Quiz Attempts</h3><button class="btn" onclick="adminAttempts()">View All</button></div>${recent.length?`<div style="overflow:auto"><table class="table"><tr><th>Student ID</th><th>Student</th><th>Quiz</th><th>Score</th><th>Date</th></tr>${recent.slice(0,10).map(r=>`<tr><td><b>${r.student_id}</b></td><td>${esc(r.full_name)}<br><small>${esc(r.username)}</small></td><td>${esc(r.title)}</td><td>${r.score}/${r.total} (${r.percentage}%)</td><td>${new Date(r.created_at).toLocaleString()}</td></tr>`).join('')}</table></div>`:`<div class="empty">No test/quiz attempts yet.</div>`}</div>`}
async function adminModules(){const ms=await api("/api/admin/modules");adminContent.innerHTML=`<h1 class="page-title">Manage Modules</h1><div class="panel"><form id="mf" class="form-grid"><div class="field"><input name="title" placeholder="Module title" required></div><div class="field"><input name="icon" value="📘" placeholder="Icon"></div><div class="field full"><input name="description" placeholder="Description"></div><button class="primary full">Add Module</button></form></div><div class="panel" style="margin-top:14px"><table class="table"><tr><th>ID</th><th>Module</th><th>Questions</th><th>Action</th></tr>${ms.map(m=>`<tr><td>${m.id}</td><td>${m.icon} ${esc(m.title)}</td><td>${m.question_count}</td><td><button class="btn" onclick="deleteModule(${m.id})">Delete</button></td></tr>`).join("")}</table></div>`;mf.onsubmit=async e=>{e.preventDefault();await api("/api/admin/modules",{method:"POST",body:JSON.stringify(Object.fromEntries(new FormData(mf)))});toast("Module added");adminModules()}}
async function deleteModule(id){if(confirm("Delete this module and its questions?")){await api("/api/admin/modules/"+id,{method:"DELETE"});adminModules()}}
async function adminAttempts(){
 adminContent.innerHTML=`<h1 class="page-title">Test / Quiz Attempts</h1><div class="panel"><div style="display:flex;gap:10px;flex-wrap:wrap"><input id="attemptSearch" class="search" style="max-width:420px" placeholder="Search Student ID, username, email or name"><button class="primary" id="attemptSearchBtn">Search</button><button class="btn" id="attemptClearBtn">Clear</button></div><p class="muted" style="margin-top:10px">Admin can see which Student ID has attempted which quiz, score and date.</p></div><div class="panel" style="margin-top:14px"><div id="attemptList">Loading...</div></div>`;
 async function load(){try{const q=attemptSearch.value.trim();const rows=await api('/api/admin/attempts'+(q?'?q='+encodeURIComponent(q):''));attemptList.innerHTML=rows.length?`<div style="overflow:auto"><table class="table"><tr><th>Attempt ID</th><th>Student ID</th><th>Student</th><th>Username</th><th>Quiz</th><th>Score</th><th>Percentage</th><th>Date</th></tr>${rows.map(r=>`<tr><td>#${r.attempt_id}</td><td><b>${r.student_id}</b></td><td>${esc(r.full_name)}</td><td>${esc(r.username)}</td><td>${esc(r.title)}</td><td>${r.score}/${r.total}</td><td>${r.percentage}%</td><td>${new Date(r.created_at).toLocaleString()}</td></tr>`).join('')}</table></div>`:`<div class="empty">No test/quiz attempts found.</div>`}catch(e){attemptList.innerHTML=`<div class="error" style="display:block">${esc(e.message)}</div>`}}
 attemptSearchBtn.onclick=load;attemptClearBtn.onclick=()=>{attemptSearch.value='';load()};attemptSearch.onkeydown=e=>{if(e.key==='Enter')load()};load();
}
async function adminQuestions(){const ms=await api("/api/admin/modules");adminContent.innerHTML=`<h1 class="page-title">Manage Questions</h1><div class="panel"><div class="field"><select id="sel">${ms.map(m=>`<option value="${m.id}">${m.id} - ${esc(m.title)}</option>`).join("")}</select></div><div id="ql"></div><h3>Add Question</h3><form id="qf" class="form-grid"><input type="hidden" name="moduleId" id="mid"><div class="field full"><input name="question" placeholder="Question" required></div>${["a","b","c","d"].map(x=>`<div class="field"><input name="${x}" placeholder="Option ${x.toUpperCase()}" required></div>`).join("")}<div class="field"><select name="correct"><option>A</option><option>B</option><option>C</option><option>D</option></select></div><button class="primary full">Add Question</button></form></div>`;mid.value=sel.value;sel.onchange=()=>{mid.value=sel.value;loadQuestions(sel.value)};qf.onsubmit=async e=>{e.preventDefault();await api("/api/admin/questions",{method:"POST",body:JSON.stringify(Object.fromEntries(new FormData(qf)))});qf.reset();mid.value=sel.value;loadQuestions(sel.value);toast("Question added")};loadQuestions(sel.value)}
async function loadQuestions(id){const qs=await api("/api/admin/questions/"+id);ql.innerHTML=`<h3>Questions (${qs.length})</h3>${qs.map(q=>`<div class="q"><b>${esc(q.question)}</b><p>A. ${esc(q.option_a)} &nbsp; B. ${esc(q.option_b)} &nbsp; C. ${esc(q.option_c)} &nbsp; D. ${esc(q.option_d)}</p><small>Correct: ${q.correct_answer}</small><button class="btn" style="float:right" onclick="deleteQuestion(${q.id})">Delete</button></div>`).join("")||`<div class="empty">No questions.</div>`}`}
async function deleteQuestion(id){await api("/api/admin/questions/"+id,{method:"DELETE"});loadQuestions(sel.value)}
async function adminLogout(){await api("/api/auth/logout",{method:"POST"});S={role:null,user:null,page:"dashboard"};authScreen()}
async function render(){
 clearInterval(S.timer);
 if(!S.role)return authScreen();
 if(S.role==="admin")return adminLayout();
 if(S.page==="quiz")return quiz();
 if(S.page==="result")return result();
 if(S.page==="dashboard")return dashboard();
 if(S.page==="take")return modules();
 if(S.page==="profile")return profile();
 if(S.page==="leaderboard")return leaderboard();
 if(S.page==="results")return results();
 if(S.page==="certificates")return certificates();
 if(S.page==="settings")return settings();
}
render().catch(e=>{
  console.error(e);
  app.innerHTML=`<div class="auth"><div class="auth-card"><div class="brand"><div class="brand-icon">🏆</div><h1>Quiz Competition Pro</h1><p>Application error</p></div><div class="error" style="display:block;margin:18px 0">${esc(e.message||e)}</div><button class="primary" onclick="location.reload()">Reload Application</button></div></div>`;
});

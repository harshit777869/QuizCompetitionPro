const Database=require("better-sqlite3");
const path=require("path");
const QUESTIONS=require("./questions");
const db=new Database(path.join(__dirname,"quiz.db"));
db.pragma("journal_mode=WAL");
db.pragma("foreign_keys=ON");
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,full_name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,username TEXT NOT NULL UNIQUE,password TEXT NOT NULL,course TEXT,created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS admins(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT UNIQUE NOT NULL,password TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS modules(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,description TEXT,icon TEXT,question_count INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS questions(id INTEGER PRIMARY KEY AUTOINCREMENT,module_id INTEGER NOT NULL,question TEXT NOT NULL,option_a TEXT NOT NULL,option_b TEXT NOT NULL,option_c TEXT NOT NULL,option_d TEXT NOT NULL,correct_answer TEXT NOT NULL,FOREIGN KEY(module_id) REFERENCES modules(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS attempts(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,module_id INTEGER NOT NULL,score INTEGER NOT NULL,total INTEGER NOT NULL,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id),FOREIGN KEY(module_id) REFERENCES modules(id));
`);
if(db.prepare("SELECT COUNT(*) c FROM admins").get().c===0)db.prepare("INSERT INTO admins(username,password) VALUES(?,?)").run("admin","admin123");
if(db.prepare("SELECT COUNT(*) c FROM modules").get().c===0){
 const modules=[["General Knowledge", "Explore all quiz categories", "🌐"], ["Current Affairs", "Recent events and important updates", "📰"], ["Indian History", "Explore India's rich historical journey", "🏛️"], ["Indian Geography", "Maps, places and physical geography", "📍"], ["Indian Polity", "Constitution, government and civics", "🏛️"], ["Science & Technology", "Discover science and technology", "⚛️"], ["Sports", "Sports knowledge and champions", "🏆"], ["Entertainment", "Movies, music and popular culture", "🎬"], ["Computer Science", "Programming and computing fundamentals", "💻"], ["Logical Reasoning", "Sharpen your reasoning skills", "🧠"], ["Mathematics", "Numbers, formulas and problem solving", "➗"], ["English", "Grammar, vocabulary and comprehension", "🔤"], ["Environment", "Nature, climate and sustainability", "🌱"], ["Economics", "Markets, money and basic economics", "📈"], ["World History", "Major events across the world", "🌍"], ["World Geography", "Countries, capitals and landmarks", "🗺️"], ["General Science", "Physics, chemistry and biology", "🔬"], ["Cyber Security", "Digital safety and security concepts", "🔐"], ["Artificial Intelligence", "AI and machine learning basics", "🤖"], ["Business & Management", "Business concepts and leadership", "💼"]];
 const addM=db.prepare("INSERT INTO modules(title,description,icon,question_count) VALUES(?,?,?,?)");
 const addQ=db.prepare("INSERT INTO questions(module_id,question,option_a,option_b,option_c,option_d,correct_answer) VALUES(?,?,?,?,?,?,?)");
 const tx=db.transaction(()=>modules.forEach(m=>{
   const list=QUESTIONS[m[0]]||[];
   const id=addM.run(m[0],m[1],m[2],list.length).lastInsertRowid;
   list.forEach(q=>addQ.run(id,q[0],q[1],q[2],q[3],q[4],q[5]));
 }));
 tx();
}
module.exports=db;

import React, { useState, useRef, useEffect } from "react";

export default function ChatGPT() {
 const [messages,setMessages] = useState([{role:"system",content:"Hi! I'm AuditDNA Chat."}]);
 const [input,setInput] = useState("");
 const [loading,setLoading] = useState(false);
 const chatEndRef = useRef(null);

 useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

 async function sendMessage(e){
 e.preventDefault();
 if(!input.trim()) return;
 setLoading(true);
 const userMsg = {role:"user",content:input};
 setMessages(m=>[...m,userMsg]);
 setInput("");
 try {
 const res = await fetch("/.netlify/functions/chatgpt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[...messages,userMsg]})});
 const data = await res.json();
 setMessages(m=>[...m,{role:"assistant",content:data.reply}]);
 } catch(err){
 setMessages(m=>[...m,{role:"assistant",content:"Error: API unreachable."}]);
 }
 setLoading(false);
 }

 return (
 <div className="chatgpt-container">
 <div className="chatgpt-messages">
 {messages.map((msg,i)=><div key={i} className={"msg ${msg.role}"}><span>{msg.content}</span></div>)}
 <div ref={chatEndRef}/>
 </div>
 <form className="chatgpt-form" onSubmit={sendMessage}>
 <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask AuditDNA..." disabled={loading}/>
 <button type="submit" disabled={loading||!input.trim()}>{loading?"...":"Send"}</button>
 </form>
 </div>
 );
}

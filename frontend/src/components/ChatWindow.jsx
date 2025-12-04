import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';
import MoodChart from './MoodChart';

const API = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';


export default function ChatWindow(){
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
const chatRef = useRef(null);


useEffect(()=>{ fetchHistory(); }, []);


const fetchHistory = async ()=>{
try{
const res = await axios.get(`${API}/history`);
setMessages(res.data.history || []);
}catch(e){ console.error(e); }
}


const send = async ()=>{
if(!input.trim()) return;
const text = input.trim();
setInput('');
setLoading(true);
try{
const res = await axios.post(`${API}/chat`, { message: text });
setMessages(res.data.history);
}catch(e){
console.error(e);
// local fallback message
setMessages(prev=>[...prev, { sender:'bot', text:'Server error — check backend.' }]);
}finally{ setLoading(false); scrollBottom(); }
}


const endSummary = async ()=>{
try{
const res = await axios.get(`${API}/summary`);
// summary returned along with history
setMessages(res.data.history);
alert(`Overall: ${res.data.summary.overall_label} (avg ${res.data.summary.avg_score.toFixed(2)})`);
}catch(e){ console.error(e); }
}


const reset = async ()=>{
await axios.post(`${API}/reset`);
setMessages([]);
}


const downloadTranscript = ()=>{
const lines = messages.map(m=>`${m.sender}: ${m.text}${m.sentiment?` (${m.sentiment.label} ${m.sentiment.score.toFixed(2)})`:''}`);
const blob = new Blob([lines.join('\n')], {type:'text/plain'});
const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='transcript.txt'; a.click(); URL.revokeObjectURL(url);
}


const scrollBottom = ()=>{ setTimeout(()=>{ chatRef.current && (chatRef.current.scrollTop = chatRef.current.scrollHeight); }, 100); }


useEffect(()=> scrollBottom(), [messages]);


return (
<div className="grid grid-cols-3 gap-6" >
<div className="col-span-2">
<div ref={chatRef} className="bg-[#17122b] p-4 rounded h-[60vh] overflow-auto" >
{messages.map((m,i)=> <MessageBubble key={i} msg={m} />)}
</div>


<div className="flex gap-3 mt-4">
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} className="flex-1 p-3 rounded bg-[#0f0b18] border border-[#2a2140]" placeholder="Type a message (markdown supported)..." />
<button onClick={send} className="px-4 py-2 rounded bg-gradient-to-r from-[#b183ff] to-[#6f2bd8]">{loading? '...' : 'Send'}</button>
<button onClick={endSummary} className="px-4 py-2 rounded border">Summary</button>
</div>


<div className="flex gap-3 mt-2">
<button onClick={downloadTranscript} className="muted">Download</button>
<button onClick={reset} className="muted">Reset</button>
</div>
</div>


<aside className="col-span-1 bg-[#191329] p-4 rounded">
<h3 className="text-lg font-bold text-[#c792ff]">Mood Trend</h3>
<MoodChart messages={messages} />
<div className="mt-4 text-sm text-[#bfb4ff]">
<strong>Dominant emotion:</strong>
<div>{(() => { const user = messages.filter(m=>m.sender==='user'); const emo = user.map(u=>u.sentiment && u.sentiment.emotion).filter(Boolean); const counts = {}; emo.forEach(e=>counts[e]=(counts[e]||0)+1); const top = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]; return top? top[0] : 'N/A'; })()}</div>
</div>
</aside>
</div>
);
}
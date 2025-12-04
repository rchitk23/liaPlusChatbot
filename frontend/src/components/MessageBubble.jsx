import React from 'react';
import { marked } from 'marked';


export default function MessageBubble({ msg }){
const isUser = msg.sender === 'user';
return (
<div className={`msg ${isUser? 'user ml-auto text-right' : 'bot' } mb-3`}>
<div className="meta text-xs text-[#9a93b8]">{msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}</div>
<div className={`bubble p-3 rounded ${isUser? 'bg-gradient-to-b from-[#3a0f66] to-[#2b0a4c]' : 'bg-[#201232]'}` } dangerouslySetInnerHTML={{__html: marked.parseInline(msg.text)}} />
{msg.sentiment && <div className={`tag ${msg.sentiment.label} mt-2`}>{msg.sentiment.label} {msg.sentiment.score.toFixed(2)}</div>}
</div>
);
}
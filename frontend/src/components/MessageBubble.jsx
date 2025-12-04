import React from 'react';
import { marked } from 'marked';


// export default function MessageBubble({ msg }){
// const isUser = msg.sender === 'user';
// return (
// <div className={`msg ${isUser? 'user ml-auto text-right' : 'bot' } mb-3`}>
// <div className="meta text-xs text-[#9a93b8]">{msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}</div>
// <div className={`bubble p-3 rounded ${isUser? 'bg-gradient-to-b from-[#3a0f66] to-[#2b0a4c]' : 'bg-[#201232]'}` } dangerouslySetInnerHTML={{__html: marked.parseInline(msg.text)}} />
// {msg.sentiment && <div className={`tag ${msg.sentiment.label} mt-2`}>{msg.sentiment.label} {msg.sentiment.score.toFixed(2)}</div>}
// </div>
// );
// }

export default function MessageBubble({ msg }) {
  const isUser = msg.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] p-3 rounded-2xl shadow 
        ${isUser ? 
          'bg-[#3a0f66] text-white rounded-br-none' : 
          'bg-[#2b2140] text-white rounded-bl-none'
        }`}
        dangerouslySetInnerHTML={{__html: marked.parseInline(msg.text)}}
      />

      {/* Sentiment Tag */}
      {msg.sentiment && (
        <div className="ml-2 text-xs text-[#bfb4ff] self-end">
          {msg.sentiment.label} ({msg.sentiment.score.toFixed(2)})
        </div>
      )}
    </div>
  );
}

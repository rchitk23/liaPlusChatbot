import React, { useMemo, useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);


export default function MoodChart({ messages }){
const canvasRef = useRef(null);
const userScores = useMemo(()=> messages.filter(m=>m.sender==='user').map(m=>m.sentiment? m.sentiment.score : 0), [messages]);


useEffect(()=>{
const ctx = canvasRef.current.getContext('2d');
const chart = new Chart(ctx, {
type: 'line',
data: { labels: userScores.map((_,i)=>i+1), datasets: [{ label: 'Mood', data: userScores, borderColor:'#c792ff', backgroundColor:'rgba(199,146,255,0.12)', tension:0.4 }] },
options: { scales:{ y:{ min:-1, max:1 } }, plugins:{ legend:{ display:false } } }
});
return ()=> chart.destroy();
}, [userScores]);


return <canvas ref={canvasRef} width={300} height={160} />;
}
import logo from './logo.svg';
import './App.css';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
<div className="min-h-screen bg-gradient-to-b from-[#0b0620] to-[#130826] text-white p-6">
<div className="max-w-6xl mx-auto">
<header className="flex items-center gap-4 mb-6">
<img src="/logo.svg" alt="LiaPlus" className="w-40" />
<h1 className="text-2xl font-bold text-[#c792ff]">LiaPlus AI — Sentiment Chat</h1>
</header>
<ChatWindow />
</div>
</div>
  );
}

export default App;

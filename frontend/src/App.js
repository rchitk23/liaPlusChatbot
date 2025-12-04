
import './App.css';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    
<div className="min-h-screen bg-gradient-to-b from-[#0b0620] to-[#130826] text-white p-6">
<div className="max-w-6xl mx-auto">
<header className="w-full flex items-center justify-center mb-6">
  <h1 className="text-2xl font-bold text-[#c792ff] text-center">
    LiaPlus AI — Sentiment Chat
  </h1>
</header>
<ChatWindow />
</div>
</div>
  );
}

export default App;

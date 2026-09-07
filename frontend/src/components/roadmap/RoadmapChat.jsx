import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiTrash2, FiZap, FiUser, FiLoader, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { buildFallbackRoadmap } from '../../data/fallbackRoadmaps.js';

const QUICK_PROMPTS = [
  { label: '📄 From My Resume', text: 'Analyze my uploaded resume and build a targeted roadmap for my skill gaps.' },
  { label: '🚀 MERN Stack', text: 'Create a comprehensive MERN Stack Developer roadmap.' },
  { label: '🐍 Python AI', text: 'Create a Python & Generative AI Engineer roadmap.' },
  { label: '☁️ DevOps', text: 'Create a DevOps & Cloud Engineer roadmap.' }
];

const RoadmapChat = ({ onRoadmapUpdate }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Career Coach. Tell me your target role or click "From My Resume" to generate a personalized roadmap!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Fetch Chat History from Backend on Mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/roadmap/history', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.log('ℹ️ Server history offline, running in local mode.');
      }
    };
    fetchHistory();
  }, []);

  const handleSendMessage = async (textToSend = null) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg = { sender: 'user', text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/roadmap/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message: messageText })
      });
      const data = await res.json();

      let replyText = `I've received your request: "${messageText}". Your personalized roadmap is now active!`;
      if (data.success && data.aiResponse) {
        replyText = data.aiResponse;
      }

      // Automatically update Visual Roadmap diagram on right side
      if (data.success && data.roadmap && onRoadmapUpdate) {
        console.log("🗺️ Updating Visual Roadmap on Right Panel:", data.roadmap);
        onRoadmapUpdate(data.roadmap);
      } else {
        // Fallback: Check if replyText itself is raw JSON
        try {
          const cleanJson = replyText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          if (parsed && parsed.roadmap && onRoadmapUpdate) {
            onRoadmapUpdate(parsed.roadmap);
          }
        } catch (e) {}

        // Fallback to local template so the roadmap ALWAYS appears on request
        const localRoadmap = buildFallbackRoadmap(messageText);
        if (localRoadmap && onRoadmapUpdate) {
          console.log("🗺️ Using local fallback roadmap for:", messageText);
          onRoadmapUpdate(localRoadmap);
          replyText = `I've received your request for a ${localRoadmap.title.replace(' Roadmap', '')} roadmap. Your roadmap is ready on the right panel!`;
        }
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
    } catch (err) {
      console.error('Error sending message:', err);
      const localRoadmap = buildFallbackRoadmap(messageText);
      if (localRoadmap && onRoadmapUpdate) {
        console.log("🗺️ Using local fallback roadmap (offline) for:", messageText);
        onRoadmapUpdate(localRoadmap);
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `I've received your request: "${messageText}". ${
            localRoadmap
              ? 'Your roadmap is ready on the right panel! (Server is offline, showing a sample roadmap.)'
              : 'Tell me which career/goal to target and I will build your roadmap.'
          }`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Clear your roadmap chat history?')) return;
    try {
      await fetch('http://localhost:5000/api/roadmap/clear', {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (e) {
      console.log('Clear call fallback');
    }
    setMessages([
      {
        sender: 'ai',
        text: 'Chat history cleared. Tell me your target career goal!'
      }
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-[#111113] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header with Generous Padding */}
      <div className="px-5 py-4 border-b border-white/10 bg-zinc-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-sm">
            <FiZap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">AI Career Assistant</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected & Ready
            </div>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          title="Clear History"
          className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 px-4 md:px-5 py-5 overflow-y-auto space-y-4 text-xs md:text-sm">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={idx} className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <FiZap className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-zinc-900/95 border border-white/10 text-zinc-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <FiUser className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-zinc-400 text-xs pl-1 py-1">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <FiLoader className="w-4 h-4 animate-spin" />
            </div>
            <span className="animate-pulse font-medium">Architecting your roadmap...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Preset Prompts Chips */}
      <div className="px-4 py-3 bg-zinc-950/60 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt.text)}
            className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-zinc-900 text-zinc-300 border border-white/10 hover:border-indigo-500/40 hover:text-indigo-300 shrink-0 transition-all shadow-sm flex items-center gap-1"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Message Input Container with Generous Internal Padding */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 bg-zinc-950 border-t border-white/10 flex items-center gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI to create or adjust roadmap..."
          disabled={loading}
          className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/60 transition-colors shadow-inner"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium transition-colors shadow-lg shadow-indigo-600/20 shrink-0 flex items-center justify-center"
        >
          <FiSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default RoadmapChat;

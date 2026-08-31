import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import { FiSend } from 'react-icons/fi'

const GREETING = {
  role: 'assistant',
  content:
    "Hey! 👋\n\nI'm your AI Career Coach. I'll ask a few questions to understand your current level and career goal.\n\nLet's start.\n\nWhat role are you targeting?",
  timestamp: new Date().toISOString()
}

const ChatPanel = ({ chat, started, isThinking, onSend, displayName }) => {
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const textareaRef = useRef(null)

  const messages = started && chat?.conversation?.length
    ? chat.conversation
    : [GREETING]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isThinking])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const submit = () => {
    const text = input.trim()
    if (!text || isThinking) return
    onSend(text)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const autoGrow = (e) => {
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="flex flex-col h-[70vh] lg:h-[calc(100vh-200px)] min-h-[480px] rounded-2xl bg-[#101013]/80 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Chat header */}
      <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="font-semibold text-white">AI Career Coach</span>
        </div>
        <p className="text-xs text-zinc-500 mt-1">
          I&apos;ll ask a few questions to understand your current level and career goal.
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <ChatMessage key={`${msg.role}-${i}`} msg={msg} displayName={displayName} />
        ))}
        {isThinking && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={autoGrow}
            placeholder="Type your answer..."
            aria-label="Chat message"
            className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/40 transition-colors max-h-[160px]"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || isThinking}
            aria-label="Send message"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors disabled:opacity-40 disabled:hover:bg-red-600 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            <FiSend size={17} />
          </button>
        </div>
        <p className="text-[11px] text-zinc-600 mt-2 px-1">
          Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  )
}

export default ChatPanel

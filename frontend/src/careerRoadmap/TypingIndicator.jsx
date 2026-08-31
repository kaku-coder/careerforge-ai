import { memo } from 'react'
import { FiCpu } from 'react-icons/fi'

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="max-w-[82%] rounded-2xl px-4 py-3 bg-white/[0.06] border border-white/10 text-zinc-300 rounded-bl-sm">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span>🤖</span>
        <span className="text-[11px] font-medium text-zinc-500">AI is thinking...</span>
      </div>
      <div className="flex items-center gap-1.5">
        <FiCpu size={13} className="text-red-400 animate-pulse" />
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      </div>
    </div>
  </div>
)

export default memo(TypingIndicator)

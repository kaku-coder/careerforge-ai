import { memo } from 'react'

const ChatMessage = ({ msg, displayName }) => {
  const isUser = msg.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-200`}>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-red-600/90 text-white rounded-br-sm'
          : 'bg-white/[0.06] border border-white/10 text-zinc-200 rounded-bl-sm'
      }`}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span>🤖</span>
            <span className="text-[11px] font-medium text-zinc-500">AI Coach</span>
          </div>
        )}
        {isUser && (
          <div className="flex items-center gap-1.5 mb-1.5 justify-end">
            <span className="text-[11px] font-medium text-red-200/80">{displayName}</span>
          </div>
        )}
        <span>{msg.content}</span>
      </div>
    </div>
  )
}

export default memo(ChatMessage)

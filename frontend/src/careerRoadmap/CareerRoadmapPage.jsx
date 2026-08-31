import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getCareerRoadmap,
  createCareerRoadmap,
  sendChatMessage,
  updateRoadmapItem,
  regenerateRoadmap
} from '../services/careerRoadmapApi'
import ChatPanel from './ChatPanel'
import RoadmapPanel from './RoadmapPanel'
import { FiRefreshCw, FiTarget, FiX } from 'react-icons/fi'

const CareerRoadmapPage = () => {
  const { user } = useAuth()
  const [roadmapState, setRoadmapState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initError, setInitError] = useState(null)
  const [isThinking, setIsThinking] = useState(false)
  const [isUpdatingRoadmap, setIsUpdatingRoadmap] = useState(false)
  const [regenerateOpen, setRegenerateOpen] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    const init = async () => {
      setLoading(true)
      const res = await getCareerRoadmap()
      if (res.success) {
        setRoadmapState(res.data)
      } else {
        setInitError(res.error || 'Could not load your roadmap.')
      }
      setLoading(false)
    }
    init()
  }, [])

  const ensureStarted = useCallback(async () => {
    if (roadmapState && roadmapState.started) return roadmapState
    const res = await createCareerRoadmap()
    if (res.success) {
      setRoadmapState((prev) => ({
        ...res.data,
        started: true,
        profile: prev?.profile || res.data.profile,
        roadmap: prev?.roadmap || res.data.roadmap
      }))
      return { ...res.data, started: true }
    }
    return null
  }, [roadmapState])

  const handleSend = useCallback(
    async (text) => {
      if (!text || isThinking) return
      let curr = roadmapState
      if (!curr || !curr.started) {
        curr = await ensureStarted()
      }
      if (!curr) return

      const userMsg = {
        chat: curr.chat || {},
        roadmap: curr.roadmap || { items: [] }
      }
      // optimistic local user message
      const conversation = [
        ...(curr.chat?.conversation || []),
        { role: 'user', content: text, timestamp: new Date().toISOString() }
      ]
      setRoadmapState((prev) => ({
        ...prev,
        chat: { ...(prev.chat || {}), conversation }
      }))

      setIsThinking(true)
      const res = await sendChatMessage(text)
      setIsThinking(false)
      setIsUpdatingRoadmap(true)

      if (res.success) {
        setRoadmapState((prev) => ({
          ...prev,
          started: true,
          chat: res.data.chat,
          profile: res.data.profile,
          roadmap: res.data.roadmap
        }))
      } else {
        // rollback to pre-message conversation
        setRoadmapState((prev) => ({
          ...prev,
          chat: { ...(prev.chat || {}), conversation: userMsg.chat?.conversation || [] },
          error: res.error
        }))
        setTimeout(() => {
          setRoadmapState((prev) => ({ ...prev, error: null }))
        }, 4000)
      }
      setIsUpdatingRoadmap(false)
    },
    [roadmapState, isThinking, ensureStarted]
  )

  const handleMarkCompleted = useCallback(
    async (itemId) => {
      const res = await updateRoadmapItem(itemId, 'completed')
      if (res.success) {
        setRoadmapState((prev) => ({
          ...prev,
          ...res.data,
          profile: prev?.profile || res.data.profile,
          chat: prev?.chat || res.data.chat
        }))
      }
    },
    []
  )

  const handleRegenerate = useCallback(async () => {
    setRegenerateOpen(false)
    setIsUpdatingRoadmap(true)
    const res = await regenerateRoadmap()
    setIsUpdatingRoadmap(false)
    if (res.success) {
      setRoadmapState((prev) => ({
        ...prev,
        ...res.data,
        profile: prev?.profile || res.data.profile,
        chat: prev?.chat || res.data.chat
      }))
    } else {
      setRoadmapState((prev) => ({ ...prev, error: res.error || 'Could not regenerate.' }))
      setTimeout(() => {
        setRoadmapState((prev) => ({ ...prev, error: null }))
      }, 4000)
    }
  }, [])

  const displayName = (user?.username || user?.name || 'Career User')
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

  const targetRole = roadmapState?.profile?.targetRole || roadmapState?.roadmap?.currentStep || 'Full Stack Developer'

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#09090B]">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-red-500 rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest">Loading your journey...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#09090B] text-zinc-100 font-sans relative overflow-hidden">
      {/* subtle ambient gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                AI Career Coach
              </h1>
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Tell me where you are. I&apos;ll show you where to go.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <FiTarget className="text-red-400" size={16} />
              <span className="text-sm text-zinc-300">
                Target: <span className="font-semibold text-white">{targetRole}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setRegenerateOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors text-sm cursor-pointer"
            >
              <FiRefreshCw size={15} />
              <span>Regenerate Roadmap</span>
            </button>
          </div>
        </header>

        {initError && !roadmapState && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center mb-6">
            <p className="text-red-300 text-sm">{initError}</p>
            <button
              type="button"
              onClick={async () => {
                setLoading(true)
                const res = await getCareerRoadmap()
                if (res.success) setRoadmapState(res.data)
                setInitError(null)
                setLoading(false)
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-red-500/20 text-red-200 text-sm cursor-pointer hover:bg-red-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {roadmapState?.error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-300 mb-5 flex items-center gap-2">
            <span>⚠️ Something went wrong. Please try again.</span>
            <span className="text-red-400/70 text-xs ml-1">{roadmapState.error}</span>
          </div>
        )}

        {/* Main two-panel layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <ChatPanel
            ready={roadmapState ? true : false}
            started={roadmapState?.started}
            chat={roadmapState?.chat}
            isThinking={isThinking}
            onSend={handleSend}
            displayName={displayName}
          />

          <RoadmapPanel
            profile={roadmapState?.profile}
            roadmap={roadmapState?.roadmap}
            started={roadmapState?.started}
            onMarkCompleted={handleMarkCompleted}
            isUpdatingRoadmap={isUpdatingRoadmap}
          />
        </div>
      </div>

      {/* Regenerate confirmation modal */}
      {regenerateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start justify-between">
              <h3 className="text-white font-semibold text-lg">Regenerate Roadmap</h3>
              <button
                type="button"
                onClick={() => setRegenerateOpen(false)}
                aria-label="Close"
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              Regenerating will rebuild your roadmap based on your current profile. Any existing
              progress you&apos;ve marked as completed could be overwritten. Continue?
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setRegenerateOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/15 text-zinc-300 text-sm cursor-pointer hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRegenerate}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold cursor-pointer transition-colors"
              >
                {isUpdatingRoadmap ? 'Regenerating...' : 'Regenerate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerRoadmapPage

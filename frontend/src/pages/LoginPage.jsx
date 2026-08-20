import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated login redirect to dashboard
    navigate('/overview')
  }

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth route
    window.location.href = 'http://localhost:8000/api/auth/google'
  }

  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex flex-col lg:flex-row bg-[#F8F6F1] bg-grid-lines text-[#111110] select-none relative">
      {/* Corner Crosshair Ticks */}
      <span className="absolute top-3 left-4 font-mono text-xs text-[#88857d] z-10">+</span>
      <span className="absolute top-3 right-4 font-mono text-xs text-[#88857d] z-10">+</span>
      <span className="absolute bottom-3 right-4 font-mono text-xs text-[#88857d] z-10">+</span>

      {/* Left Column: Brand & AI Tech Graphic */}
      <div className="lg:w-1/2 p-8 md:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#e2e0d6] flex flex-col justify-between relative overflow-hidden">
        <div>
          {/* Top Tagline */}
          <div className="font-mono text-[12px] tracking-[0.12em] text-[#66645e] uppercase mb-8">
            // ACCESS YOUR CAREER SYSTEM
          </div>

          {/* Huge Headline */}
          <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.92] tracking-[-0.03em] text-[#111110] uppercase mb-6">
            WELCOME<br />
            BACK.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[15px] md:text-base text-[#66645e] max-w-md leading-relaxed">
            Sign in to your AI Career System and continue your journey.
          </p>
        </div>

        {/* Generative AI Neural Matrix Graphic (CSS/SVG Vector Art) */}
        <div className="my-10 relative w-full h-64 md:h-80 flex items-center justify-center">
          <svg className="w-full h-full max-w-md text-[#111110] opacity-85" viewBox="0 0 400 300" fill="none">
            {/* Grid & Node Network Representation */}
            <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#111110" opacity="0.2" />
            </pattern>
            <rect width="400" height="300" fill="url(#dot-grid)" />

            {/* Neural Connections & Nodes */}
            <path d="M50 150 L120 80 L220 120 L320 60" stroke="#111110" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M80 220 L160 160 L260 220 L350 140" stroke="#111110" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M120 80 L160 160 L220 120 L260 220" stroke="#111110" strokeWidth="1" opacity="0.4" />

            {/* Nodes */}
            <circle cx="120" cy="80" r="5" fill="#111110" />
            <circle cx="220" cy="120" r="6" fill="#111110" />
            <circle cx="160" cy="160" r="4" fill="#111110" />
            <circle cx="260" cy="220" r="5" fill="#111110" />
            <circle cx="320" cy="60" r="7" fill="#111110" />

            {/* Geometric Radar Rings */}
            <circle cx="200" cy="150" r="70" stroke="#111110" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
            <circle cx="200" cy="150" r="110" stroke="#111110" strokeWidth="1" opacity="0.15" />

            {/* AI Vector Scanner Line */}
            <line x1="200" y1="40" x2="200" y2="260" stroke="#111110" strokeWidth="1.5" opacity="0.6" />
            <rect x="185" y="135" width="30" height="30" border="1" stroke="#111110" strokeWidth="1.5" fill="#F8F6F1" />
            <text x="190" y="154" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#111110">AI</text>
          </svg>
        </div>

        {/* Bottom Metadata */}
        <div className="font-mono text-[11px] text-[#66645e] tracking-[0.1em] uppercase">
          <div className="flex gap-0.5 text-[#111110] mb-2 tracking-widest text-[10px]">
            ||||||||||||||||||||||||||||||
          </div>
          <div>//CAREER SYSTEM VER 2.6.0</div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center relative">
        <div className="max-w-md w-full mx-auto">
          {/* Form Tag Header */}
          <div className="font-mono text-[12px] tracking-[0.12em] text-[#66645e] uppercase mb-10">
            // LOGIN TO CONTINUE
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase">
                EMAIL ADDRESS
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#66645e]">
                  <FiMail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-10 pr-4 bg-[#F8F6F1] border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:ring-1 focus:ring-[#111110] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase">
                PASSWORD
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#66645e]">
                  <FiLock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-10 pr-11 bg-[#F8F6F1] border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:ring-1 focus:ring-[#111110] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#66645e] hover:text-[#111110] cursor-pointer bg-transparent border-0"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1 font-mono text-[11px] tracking-[0.08em] text-[#66645e]">
              <label className="flex items-center gap-2 cursor-pointer uppercase select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#111110] cursor-pointer"
                />
                <span>REMEMBER ME</span>
              </label>
              <a
                href="#forgot"
                className="text-[#66645e] hover:text-[#111110] uppercase underline underline-offset-4 transition-colors"
              >
                FORGOT PASSWORD?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#111110] text-[#F8F6F1] font-mono font-bold text-[13px] tracking-[0.12em] uppercase flex items-center justify-center gap-3 cursor-pointer hover:bg-[#33322e] transition-colors border-0 mt-6"
            >
              <span>SIGN IN</span>
              <FiArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="w-full border-t border-[#e2e0d6]"></div>
            <span className="absolute bg-[#F8F6F1] px-4 font-mono text-[11px] text-[#88857d] uppercase tracking-widest">
              OR
            </span>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-12 bg-[#F8F6F1] border border-[#111110] font-mono font-bold text-[12px] tracking-[0.1em] text-[#111110] uppercase flex items-center justify-center gap-3 cursor-pointer hover:bg-[#111110] hover:text-[#F8F6F1] transition-all duration-200"
          >
            <FcGoogle size={18} />
            <span>CONTINUE WITH GOOGLE</span>
          </button>

          {/* Signup Link Prompt */}
          <div className="mt-10 font-mono text-[11px] tracking-[0.08em] text-[#66645e] text-center uppercase">
            DON'T HAVE AN ACCOUNT?{' '}
            <Link
              to="/register"
              className="font-bold text-[#111110] underline underline-offset-4 hover:text-[#33322e] ml-1 inline-flex items-center gap-1 no-underline"
            >
              <span>SIGN UP</span>
              <FiArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
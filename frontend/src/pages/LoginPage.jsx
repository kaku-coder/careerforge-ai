import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/overview')
    }

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/api/auth/google'
    }

    return (
        <div className="w-full h-[calc(100vh-72px)] flex flex-col lg:flex-row bg-[#F8F6F1] text-[#111110] select-none relative overflow-hidden">

            {/* ── Corner Registration Marks ── */}
            <span className="absolute top-4 left-5 font-mono text-xs text-[#88857d] z-10">+</span>
            <span className="absolute top-4 right-5 font-mono text-xs text-[#88857d] z-10">+</span>
            <span className="absolute bottom-4 left-5 font-mono text-xs text-[#88857d] z-10">+</span>
            <span className="absolute bottom-4 right-5 font-mono text-xs text-[#88857d] z-10">+</span>

            {/* ════════════════════════════════════════════
          LEFT COLUMN — BRAND / WELCOME
         ════════════════════════════════════════════ */}
            <div className="lg:w-1/2 relative border-b lg:border-b-0 lg:border-r border-[#e2e0d6] flex flex-col bg-grid-lines-left overflow-hidden">

                {/* Content wrapper — not centered, top-aligned */}
                <div className="relative z-10 flex flex-col h-full" style={{ padding: '70px 50px 40px 50px' }}>

                    {/* Top Tagline */}
                    <div className="font-mono text-[12px] tracking-[0.15em] text-[#66645e] uppercase fade-in-1">
            // ACCESS YOUR CAREER SYSTEM
                    </div>

                    {/* Main Heading */}
                    <h1
                        className="font-sans font-black text-[#111110] uppercase mb-7 max-w-lg fade-in-2"
                        style={{
                            fontSize: 'clamp(56px, 8vw, 96px)',
                            lineHeight: '0.92',
                            letterSpacing: '-0.05em',
                            marginTop: '44px',
                        }}
                    >
                        WELCOME<br />
                        BACK.
                    </h1>

                    {/* Description */}
                    <p
                        className="font-sans text-[#66645e] leading-[1.5] fade-in-3"
                        style={{
                            fontSize: '17px',
                            maxWidth: '360px',
                            marginBottom: '32px',
                        }}
                    >
                        Sign in to your AI Career System
                        and continue your journey.
                    </p>

                    {/* Spacer pushes image and metadata to bottom */}
                    <div className="flex-1" />

                    {/* Bottom Metadata */}
                    <div className="font-mono text-[11px] text-[#66645e] tracking-[0.1em] uppercase fade-in-4">
                        {/* Waveform bars */}
                        <div className="flex gap-[3px] mb-3">
                            {[18, 12, 28, 8, 32, 14, 22, 10, 26, 16, 30, 6, 20, 24, 10, 28, 14, 18, 8, 22, 12, 26, 16, 30].map((h, i) => (
                                <span
                                    key={i}
                                    className="bg-[#111110] block"
                                    style={{
                                        width: '2px',
                                        height: `${h}px`,
                                        opacity: 0.15 + (i % 3) * 0.05,
                                    }}
                                />
                            ))}
                        </div>
                        <div>//CAREER SYSTEM</div>
                        <div className="mt-0.5">VER 2.6.0</div>
                    </div>
                </div>
            </div>

            {/* ── Center Divider (mobile: hidden, desktop: vertical) ── */}
            {/* This is handled by the lg:border-r on the left column */}

            {/* ════════════════════════════════════════════
          RIGHT COLUMN — LOGIN FORM
         ════════════════════════════════════════════ */}
            <div className="lg:w-1/2 flex flex-col overflow-y-auto">

                <div className="flex flex-col h-full" style={{ padding: '65px 50px 40px 50px' }}>

                    {/* Top Tag Header */}
                    <div className="font-mono text-[12px] tracking-[0.15em] text-[#66645e] uppercase mb-10 fade-in-1">
            // LOGIN TO CONTINUE
                    </div>

                    {/* Form Container */}
                    <div className="w-full max-w-[550px]">

                        <form onSubmit={handleSubmit}>

                            {/* ── EMAIL ── */}
                            <div className="fade-in-2">
                                <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase mb-[14px]">
                                    EMAIL ADDRESS
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-[20px] text-[#66645e] pointer-events-none">
                                        <FiMail size={16} />
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full h-[60px] bg-transparent border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:border-[#111110] transition-colors duration-200"
                                        style={{ paddingLeft: '52px', paddingRight: '20px' }}
                                    />
                                </div>
                            </div>

                            {/* ── PASSWORD — 30px gap ── */}
                            <div className="fade-in-3" style={{ marginTop: '30px' }}>
                                <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase mb-[14px]">
                                    PASSWORD
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-[20px] text-[#66645e] pointer-events-none">
                                        <FiLock size={16} />
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full h-[60px] bg-transparent border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:border-[#111110] transition-colors duration-200"
                                        style={{ paddingLeft: '52px', paddingRight: '52px' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-[18px] text-[#66645e] hover:text-[#111110] cursor-pointer bg-transparent border-0 transition-colors duration-200"
                                    >
                                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* ── REMEMBER ME / FORGOT PASSWORD — 24px gap ── */}
                            <div
                                className="flex items-center justify-between font-mono text-[11px] tracking-[0.08em] text-[#66645e] fade-in-4"
                                style={{ marginTop: '24px' }}
                            >
                                <label className="flex items-center gap-2.5 cursor-pointer uppercase select-none">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-[14px] h-[14px] accent-[#111110] cursor-pointer"
                                    />
                                    <span>REMEMBER ME</span>
                                </label>
                                <a
                                    href="#forgot"
                                    className="text-[#66645e] hover:text-[#111110] uppercase underline underline-offset-4 transition-colors duration-200"
                                >
                                    FORGOT PASSWORD?
                                </a>
                            </div>

                            {/* ── SIGN IN BUTTON — 28px gap ── */}
                            <div className="fade-in-5" style={{ marginTop: '28px' }}>
                                <button
                                    type="submit"
                                    className="w-full h-[64px] bg-[#111110] text-[#F8F6F1] font-mono font-bold text-[13px] tracking-[0.12em] uppercase flex items-center justify-center gap-3 cursor-pointer border-0 transition-all duration-200 hover:bg-[#2a2a26] group"
                                >
                                    <span>SIGN IN</span>
                                    <FiArrowRight
                                        size={16}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        </form>

                        {/* ── OR DIVIDER — 38px gap ── */}
                        <div
                            className="relative flex items-center justify-center fade-in-6"
                            style={{ marginTop: '38px' }}
                        >
                            <div className="w-full border-t border-[#e2e0d6]" />
                            <span className="absolute bg-[#F8F6F1] px-4 font-mono text-[11px] text-[#88857d] uppercase tracking-[0.15em]">
                                OR
                            </span>
                        </div>

                        {/* ── GOOGLE BUTTON — 26px gap ── */}
                        <div className="fade-in-7" style={{ marginTop: '26px' }}>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full h-[60px] bg-[#F8F6F1] border border-[#111110] font-mono font-bold text-[12px] tracking-[0.1em] text-[#111110] uppercase flex items-center justify-center gap-3 cursor-pointer hover:bg-[#111110] hover:text-[#F8F6F1] transition-all duration-200"
                            >
                                <span className="font-sans font-black text-base leading-none">G</span>
                                <span>CONTINUE WITH GOOGLE</span>
                            </button>
                        </div>
                    </div>

                    {/* Spacer pushes sign-up to bottom */}
                    <div className="flex-1" />

                    {/* ── SIGN UP FOOTER ── */}
                    <div className="font-mono text-[11px] tracking-[0.08em] text-[#66645e] uppercase mt-10 fade-in-8">
                        DON'T HAVE AN ACCOUNT?{' '}
                        <Link
                            to="/register"
                            className="font-bold text-[#111110] underline underline-offset-4 hover:text-[#33322e] ml-1 inline-flex items-center gap-1 no-underline transition-colors duration-200"
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

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [formError, setFormError] = useState('')
    const { register, loading, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/overview', { replace: true })
        }
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError('')
        const res = await register(name, email, password)
        if (res.success) {
            navigate('/overview')
        } else {
            setFormError(res.message || 'Failed to create account. Please try again.')
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/auth/google'
    }

    return (
        <div className="w-full min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] flex flex-col lg:flex-row bg-[#F8F6F1] text-[#111110] relative overflow-y-auto lg:overflow-hidden">

            {/* ── Corner Registration Marks ── */}
            <span className="absolute top-4 left-5 font-mono text-xs text-[#88857d] z-10">+</span>
            <span className="absolute top-4 right-5 font-mono text-xs text-[#88857d] z-10">+</span>
            <span className="absolute bottom-4 left-5 font-mono text-xs text-[#88857d] z-10 hidden lg:block">+</span>
            <span className="absolute bottom-4 right-5 font-mono text-xs text-[#88857d] z-10 hidden lg:block">+</span>

            {/* ════════════════════════════════════════════
          LEFT COLUMN — BRAND / WELCOME
         ════════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:w-1/2 relative border-r border-[#e2e0d6] flex-col bg-grid-lines-left overflow-hidden">
                <div className="relative z-10 flex flex-col h-full" style={{ padding: '70px 50px 40px 50px' }}>
                    <div className="font-mono text-[12px] tracking-[0.15em] text-[#66645e] uppercase fade-in-1">
                        // CREATE YOUR CAREER ACCOUNT
                    </div>

                    <h1
                        className="font-sans font-black text-[#111110] uppercase mb-7 max-w-lg fade-in-2 mt-11"
                        style={{
                            fontSize: 'clamp(56px, 8vw, 96px)',
                            lineHeight: '0.92',
                            letterSpacing: '-0.05em',
                        }}
                    >
                        JOIN THE<br />
                        PLATFORM.
                    </h1>

                    <p className="font-sans text-[17px] text-[#66645e] leading-[1.5] fade-in-3 max-w-[360px] mb-8">
                        Register to unlock AI resume scoring,
                        realistic mock interviews, and your
                        personal learning roadmap.
                    </p>

                    <div className="flex-1" />

                    <div className="font-mono text-[11px] text-[#66645e] tracking-[0.1em] uppercase fade-in-4">
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

            {/* ── Mobile Header ── */}
            <div className="lg:hidden w-full px-6 pt-8 pb-6 border-b border-[#e2e0d6] bg-grid-lines-left shrink-0 text-center flex flex-col items-center">
                <div className="font-mono text-[11px] tracking-[0.15em] text-[#66645e] uppercase mb-2">
                    // CREATE YOUR CAREER ACCOUNT
                </div>
                <h1
                    className="font-sans font-black text-[#111110] uppercase text-center"
                    style={{ fontSize: 'clamp(36px, 9vw, 56px)', lineHeight: '0.92', letterSpacing: '-0.04em' }}
                >
                    JOIN THE<br />PLATFORM.
                </h1>
            </div>

            {/* ════════════════════════════════════════════
          RIGHT COLUMN — REGISTER FORM
         ════════════════════════════════════════════ */}
            <div className="w-full lg:w-1/2 flex flex-col lg:overflow-y-auto">
                <div className="flex flex-col flex-1 h-full px-6 py-8 sm:px-10 lg:p-[70px_50px_40px_50px] items-center lg:items-start">
                    
                    <div
                        className="font-mono text-[12px] tracking-[0.15em] text-[#66645e] uppercase mb-8 lg:mb-11 text-center lg:text-left fade-in-1"
                        style={{ marginTop: '50px' }}
                    >
                        // CREATE AN ACCOUNT
                    </div>

                    <div className="w-full max-w-[550px]">
                        {formError && (
                            <div className="mb-6 p-3 bg-[#fee2e2] border border-[#ef4444] text-[#b91c1c] font-mono text-[12px] flex items-center gap-2">
                                <FiAlertCircle size={16} />
                                <span>{formError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* FULL NAME */}
                            <div className="fade-in-2">
                                <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase mb-[12px]">
                                    FULL NAME
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-[20px] text-[#66645e] pointer-events-none">
                                        <FiUser size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full h-[56px] sm:h-[60px] bg-transparent border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:border-[#111110] transition-colors duration-200"
                                        style={{ paddingLeft: '52px', paddingRight: '20px' }}
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="fade-in-3" style={{ marginTop: '20px' }}>
                                <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase mb-[12px]">
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
                                        className="w-full h-[56px] sm:h-[60px] bg-transparent border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:border-[#111110] transition-colors duration-200"
                                        style={{ paddingLeft: '52px', paddingRight: '20px' }}
                                    />
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="fade-in-4" style={{ marginTop: '20px' }}>
                                <label className="block font-mono text-[11px] tracking-[0.1em] text-[#66645e] uppercase mb-[12px]">
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
                                        placeholder="Create a strong password"
                                        className="w-full h-[56px] sm:h-[60px] bg-transparent border border-[#111110] font-mono text-[13px] text-[#111110] placeholder-[#99968e] focus:outline-none focus:border-[#111110] transition-colors duration-200"
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

                            {/* TERMS CHECKBOX */}
                            <div
                                className="font-mono text-[11px] tracking-[0.08em] text-[#66645e] fade-in-5"
                                style={{ marginTop: '18px' }}
                            >
                                <label className="flex items-center gap-2.5 cursor-pointer uppercase select-none">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="w-[14px] h-[14px] accent-[#111110] cursor-pointer"
                                    />
                                    <span>I AGREE TO THE TERMS &amp; CONDITIONS</span>
                                </label>
                            </div>

                            {/* CREATE ACCOUNT BUTTON */}
                            <div className="fade-in-6" style={{ marginTop: '24px' }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-[60px] sm:h-[64px] btn-primary-dark font-mono font-bold text-[13px] tracking-[0.12em] uppercase flex items-center justify-center gap-3 cursor-pointer border-0 disabled:opacity-50 group"
                                >
                                    <span>{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</span>
                                    <FiArrowRight
                                        size={16}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        </form>

                        {/* OR DIVIDER */}
                        <div
                            className="relative flex items-center justify-center fade-in-7"
                            style={{ marginTop: '28px' }}
                        >
                            <div className="w-full border-t border-[#e2e0d6]" />
                            <span className="absolute bg-[#F8F6F1] px-4 font-mono text-[11px] text-[#88857d] uppercase tracking-[0.15em]">
                                OR
                            </span>
                        </div>

                        {/* GOOGLE BUTTON */}
                        <div className="fade-in-8" style={{ marginTop: '24px' }}>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full h-[56px] sm:h-[60px] btn-fill-animate font-mono font-bold text-[12px] tracking-[0.1em] uppercase flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <span className="font-sans font-black text-base leading-none">G</span>
                                <span>CONTINUE WITH GOOGLE</span>
                            </button>
                        </div>
                    </div>

                    {/* SIGN IN FOOTER */}
                    <div
                        className="font-mono text-[11px] tracking-[0.08em] text-[#66645e] uppercase text-center lg:text-left fade-in-8"
                        style={{ marginTop: '5px' }}
                    >
                        ALREADY HAVE AN ACCOUNT?{' '}
                        <Link
                            to="/login"
                            className="font-bold text-[#111110] underline underline-offset-4 hover:text-[#33322e] ml-1 inline-flex items-center gap-1 no-underline transition-colors duration-200"
                        >
                            <span>SIGN IN</span>
                            <FiArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage

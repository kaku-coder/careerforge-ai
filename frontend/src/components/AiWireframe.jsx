import React from 'react'

const AiWireframe = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 480 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer frame / head silhouette */}
      <ellipse cx="240" cy="240" rx="160" ry="190" stroke="#111110" strokeWidth="1" opacity="0.15" />
      <ellipse cx="240" cy="240" rx="120" ry="150" stroke="#111110" strokeWidth="0.5" opacity="0.1" />

      {/* Horizontal scan lines */}
      <line x1="80" y1="120" x2="400" y2="120" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="80" y1="180" x2="400" y2="180" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="80" y1="240" x2="400" y2="240" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="80" y1="300" x2="400" y2="300" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="80" y1="360" x2="400" y2="360" stroke="#111110" strokeWidth="0.5" opacity="0.08" />

      {/* Vertical grid lines */}
      <line x1="160" y1="60" x2="160" y2="420" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="240" y1="60" x2="240" y2="420" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="320" y1="60" x2="320" y2="420" stroke="#111110" strokeWidth="0.5" opacity="0.06" />

      {/* Left eye */}
      <ellipse cx="185" cy="210" rx="32" ry="18" stroke="#111110" strokeWidth="1" opacity="0.25" />
      <ellipse cx="185" cy="210" rx="14" ry="14" stroke="#111110" strokeWidth="0.8" opacity="0.3" />
      <circle cx="185" cy="210" r="5" fill="#111110" opacity="0.15" />

      {/* Right eye */}
      <ellipse cx="295" cy="210" rx="32" ry="18" stroke="#111110" strokeWidth="1" opacity="0.25" />
      <ellipse cx="295" cy="210" rx="14" ry="14" stroke="#111110" strokeWidth="0.8" opacity="0.3" />
      <circle cx="295" cy="210" r="5" fill="#111110" opacity="0.15" />

      {/* Eye connecting lines */}
      <line x1="217" y1="210" x2="263" y2="210" stroke="#111110" strokeWidth="0.5" opacity="0.12" strokeDasharray="4 4" />
      <line x1="185" y1="192" x2="185" y2="170" stroke="#111110" strokeWidth="0.5" opacity="0.1" />
      <line x1="295" y1="192" x2="295" y2="170" stroke="#111110" strokeWidth="0.5" opacity="0.1" />

      {/* Nose line */}
      <line x1="240" y1="230" x2="240" y2="290" stroke="#111110" strokeWidth="0.6" opacity="0.15" />
      <line x1="230" y1="270" x2="250" y2="270" stroke="#111110" strokeWidth="0.5" opacity="0.12" />

      {/* Mouth */}
      <path d="M200 320 Q220 330 240 320 Q260 310 280 320" stroke="#111110" strokeWidth="0.8" opacity="0.18" fill="none" />

      {/* Circuit nodes — top */}
      <circle cx="185" cy="170" r="2.5" fill="#111110" opacity="0.2" />
      <circle cx="295" cy="170" r="2.5" fill="#111110" opacity="0.2" />
      <circle cx="240" cy="140" r="2" fill="#111110" opacity="0.12" />

      {/* Circuit paths from eyes */}
      <polyline points="185,170 185,140 140,140 140,100" stroke="#111110" strokeWidth="0.5" opacity="0.1" fill="none" />
      <polyline points="295,170 295,140 340,140 340,100" stroke="#111110" strokeWidth="0.5" opacity="0.1" fill="none" />
      <polyline points="240,140 240,100 240,80" stroke="#111110" strokeWidth="0.5" opacity="0.1" fill="none" />

      {/* Circuit nodes — side */}
      <circle cx="140" cy="100" r="2" fill="#111110" opacity="0.15" />
      <circle cx="340" cy="100" r="2" fill="#111110" opacity="0.15" />
      <circle cx="240" cy="80" r="2" fill="#111110" opacity="0.12" />

      {/* Side connecting arcs */}
      <path d="M80 240 Q80 180 140 160" stroke="#111110" strokeWidth="0.5" opacity="0.08" fill="none" />
      <path d="M400 240 Q400 180 340 160" stroke="#111110" strokeWidth="0.5" opacity="0.08" fill="none" />

      {/* Data streams — left */}
      <line x1="60" y1="180" x2="100" y2="180" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="50" y1="200" x2="90" y2="200" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="55" y1="220" x2="95" y2="220" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="60" y1="260" x2="100" y2="260" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="50" y1="280" x2="90" y2="280" stroke="#111110" strokeWidth="0.5" opacity="0.08" />

      {/* Data streams — right */}
      <line x1="380" y1="180" x2="420" y2="180" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="390" y1="200" x2="430" y2="200" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="385" y1="220" x2="425" y2="220" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="380" y1="260" x2="420" y2="260" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="390" y1="280" x2="430" y2="280" stroke="#111110" strokeWidth="0.5" opacity="0.08" />

      {/* Bottom circuit board pattern */}
      <line x1="120" y1="400" x2="360" y2="400" stroke="#111110" strokeWidth="0.5" opacity="0.08" />
      <line x1="120" y1="430" x2="360" y2="430" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="120" y1="460" x2="360" y2="460" stroke="#111110" strokeWidth="0.5" opacity="0.08" />

      {/* Vertical traces bottom */}
      <line x1="160" y1="400" x2="160" y2="460" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="200" y1="400" x2="200" y2="460" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="240" y1="400" x2="240" y2="460" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="280" y1="400" x2="280" y2="460" stroke="#111110" strokeWidth="0.5" opacity="0.06" />
      <line x1="320" y1="400" x2="320" y2="460" stroke="#111110" strokeWidth="0.5" opacity="0.06" />

      {/* Nodes bottom */}
      <circle cx="160" cy="430" r="2" fill="#111110" opacity="0.1" />
      <circle cx="240" cy="430" r="2" fill="#111110" opacity="0.1" />
      <circle cx="320" cy="430" r="2" fill="#111110" opacity="0.1" />

      {/* Cross markers at corners */}
      <line x1="48" y1="50" x2="60" y2="50" stroke="#111110" strokeWidth="0.5" opacity="0.15" />
      <line x1="54" y1="44" x2="54" y2="56" stroke="#111110" strokeWidth="0.5" opacity="0.15" />

      <line x1="420" y1="50" x2="432" y2="50" stroke="#111110" strokeWidth="0.5" opacity="0.15" />
      <line x1="426" y1="44" x2="426" y2="56" stroke="#111110" strokeWidth="0.5" opacity="0.15" />

      {/* Neural network connections */}
      <line x1="185" y1="210" x2="240" y2="240" stroke="#111110" strokeWidth="0.3" opacity="0.08" />
      <line x1="295" y1="210" x2="240" y2="240" stroke="#111110" strokeWidth="0.3" opacity="0.08" />
      <line x1="185" y1="210" x2="295" y2="210" stroke="#111110" strokeWidth="0.3" opacity="0.06" />

      {/* Forehead detail lines */}
      <path d="M170 160 Q200 145 240 140 Q280 145 310 160" stroke="#111110" strokeWidth="0.5" opacity="0.1" fill="none" />

      {/* Chin detail */}
      <line x1="220" y1="350" x2="260" y2="350" stroke="#111110" strokeWidth="0.5" opacity="0.1" />

      {/* Small label */}
      <text x="60" y="520" fill="#111110" opacity="0.12" fontFamily="monospace" fontSize="9" letterSpacing="2">
        NEURAL.MAP // v3.2.1
      </text>
      <text x="60" y="535" fill="#111110" opacity="0.08" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
        NODES: 142 · CONNECTIONS: 847
      </text>
    </svg>
  )
}

export default AiWireframe

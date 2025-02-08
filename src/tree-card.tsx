"use client"

import { useState } from "react"

export default function TreeCard() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full h-48 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {/* Parent node */}
        <circle cx="50" cy="20" r="10" fill="#4CAF50" />

        {/* Lines to child nodes */}
        <line x1="50" y1="30" x2="30" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="30" x2="70" y2="60" stroke="#333" strokeWidth="2" />

        {/* Child nodes */}
        <circle cx="30" cy="70" r="10" fill="#2196F3" />
        <circle cx="70" cy="70" r="10" fill="#2196F3" />

        {/* Click area for expanding */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="transparent"
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer"
        />

        {/* Expansion indicator */}
        {expanded && (
          <text x="50" y="95" textAnchor="middle" fill="#333" fontSize="12">
            Expanded
          </text>
        )}
      </svg>
    </div>
  )
}


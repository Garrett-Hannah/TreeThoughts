"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"

interface TreeCardProps {
  depth: number
  maxDepth: number
}

export default function TreeCard({ depth, maxDepth }: TreeCardProps) {
  const [expandedLeft, setExpandedLeft] = useState(false)
  const [expandedRight, setExpandedRight] = useState(false)

  const hasChildren = depth < maxDepth

  return (
    <div className="relative">
      <Card className="p-4 w-48 h-24 flex flex-col justify-between">
        <div className="text-sm font-semibold">Card Level {depth}</div>
        {hasChildren && (
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => setExpandedLeft(!expandedLeft)}>
              {expandedLeft ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setExpandedRight(!expandedRight)}>
              {expandedRight ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </Card>
      {hasChildren && (
        <>
          {expandedLeft && (
            <div className="absolute top-28 left-0">
              <TreeCard depth={depth + 1} maxDepth={maxDepth} />
            </div>
          )}
          {expandedRight && (
            <div className="absolute top-0 left-52">
              <TreeCard depth={depth + 1} maxDepth={maxDepth} />
            </div>
          )}
        </>
      )}
    </div>
  )
}


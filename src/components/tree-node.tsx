"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import Modal from "./modal"

interface TreeNodeProps {
  depth: number
  maxDepth: number
  onWidthChange?: (width: number) => void
}

export default function TreeNode({ depth, maxDepth, onWidthChange }: TreeNodeProps) {
  const [expandedLeft, setExpandedLeft] = useState(false)
  const [expandedRight, setExpandedRight] = useState(false)
  const [leftChildWidth, setLeftChildWidth] = useState(0)
  const [rightChildWidth, setRightChildWidth] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leftEntry, setLeftEntry] = useState("")
  const [rightEntry, setRightEntry] = useState("")
  const nodeRef = useRef<HTMLDivElement>(null)

  const hasChildren = depth < maxDepth

  // Constants for sizing and spacing
  const CARD_WIDTH = 192 // Width of card
  const CARD_HEIGHT = 96 // Height of card
  const VERTICAL_SPACING = 32 // Space between vertical cards
  const HORIZONTAL_SPACING = 32 // Reduce horizontal spacing to compensate
  const LINE_WIDTH = 96 // Width of connecting line
  const TOTAL_HORIZONTAL_GAP = HORIZONTAL_SPACING + LINE_WIDTH // Total space needed horizontally

  // Calculate total width including children and connection lines
  const totalWidth = Math.max(
    CARD_WIDTH,
    expandedRight ? CARD_WIDTH + TOTAL_HORIZONTAL_GAP + rightChildWidth : CARD_WIDTH,
    expandedLeft ? Math.max(leftChildWidth, CARD_WIDTH) : CARD_WIDTH,
  )

  useEffect(() => {
    // Notify parent of width changes
    onWidthChange?.(totalWidth)
  }, [totalWidth, onWidthChange])

  const handleLeftChildWidth = (width: number) => {
    setLeftChildWidth(width)
  }

  const handleRightChildWidth = (width: number) => {
    setRightChildWidth(width)
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleSave = (newLeftEntry: string, newRightEntry: string) => {
    setLeftEntry(newLeftEntry)
    setRightEntry(newRightEntry)
    // If entries are not empty, expand the corresponding sides
    if (newLeftEntry) setExpandedLeft(true)
    if (newRightEntry) setExpandedRight(true)
  }

  return (
    <>
      <div className="relative" ref={nodeRef} style={{ width: totalWidth }}>
        <div className="relative">
          <Card
            className="p-4 w-48 h-24 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleCardClick}
          >
            <div className="text-sm font-semibold">Card Level {depth}</div>
            {hasChildren && (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedLeft(!expandedLeft)
                  }}
                  disabled={!leftEntry}
                >
                  {expandedLeft ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedRight(!expandedRight)
                  }}
                  disabled={!rightEntry}
                >
                  {expandedRight ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </Card>

          {/* Connection lines */}
          {expandedLeft && <div className="absolute left-24 top-24 w-[2px] h-8 bg-gray-400" />}
          {expandedRight && (
            <div
              className="absolute left-48 top-12 bg-gray-400"
              style={{
                width: `${LINE_WIDTH}px`,
                height: "2px",
                transform: "translateX(-1px)",
              }}
            />
          )}

          {/* Children containers */}
          {hasChildren && (
            <>
              {expandedLeft && leftEntry && (
                <div className="absolute top-32 left-0">
                  <TreeNode depth={depth + 1} maxDepth={maxDepth} onWidthChange={handleLeftChildWidth} />
                </div>
              )}
              {expandedRight && rightEntry && (
                <div
                  className="absolute"
                  style={{
                    left: `${CARD_WIDTH + TOTAL_HORIZONTAL_GAP}px`,
                    top: "0px",
                    marginLeft: expandedLeft ? `${Math.max(0, leftChildWidth - CARD_WIDTH)}px` : "0px",
                  }}
                >
                  <TreeNode depth={depth + 1} maxDepth={maxDepth} onWidthChange={handleRightChildWidth} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Edit Card Level ${depth}`}
        leftEntry={leftEntry}
        rightEntry={rightEntry}
        onSave={handleSave}
      />
    </>
  )
}


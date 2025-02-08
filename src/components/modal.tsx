"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  leftEntry: string
  rightEntry: string
  onSave: (leftEntry: string, rightEntry: string) => void
}

export default function Modal({ isOpen, onClose, title, leftEntry, rightEntry, onSave }: ModalProps) {
  const [leftValue, setLeftValue] = useState(leftEntry)
  const [rightValue, setRightValue] = useState(rightEntry)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleSave = () => {
    onSave(leftValue, rightValue)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} aria-hidden="true" />
      <Card className="relative z-50 w-full max-w-lg p-6 shadow-lg animate-in fade-in zoom-in duration-200">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="leftEntry">Left Entry</Label>
            <Input
              id="leftEntry"
              value={leftValue}
              onChange={(e) => setLeftValue(e.target.value)}
              placeholder="Enter left value"
            />
          </div>
          <div>
            <Label htmlFor="rightEntry">Right Entry</Label>
            <Input
              id="rightEntry"
              value={rightValue}
              onChange={(e) => setRightValue(e.target.value)}
              placeholder="Enter right value"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  )
}


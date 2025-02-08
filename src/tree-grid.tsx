import { Card } from "@/components/ui/card"
import TreeCard from "./tree-card"

export default function TreeGrid() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tree Grid</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, index) => (
          <Card key={index} className="p-4">
            <TreeCard />
          </Card>
        ))}
      </div>
    </div>
  )
}


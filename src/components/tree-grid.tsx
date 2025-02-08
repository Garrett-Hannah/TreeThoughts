import TreeNode from "./tree-node"

export default function TreeGrid() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tree Cards</h1>
      <div className="flex justify-start items-start min-h-[800px] overflow-auto p-8">
        <TreeNode depth={0} maxDepth={5} />
      </div>
    </div>
  )
}


import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Layout, MessageSquare } from "lucide-react"
import Navbar from "./Navbar"

function BoardCard({ board }: { board: string }) {
  return (
    <Link href={`/board/${board}`}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-100">
            <Layout className="w-5 h-5 mr-2 text-indigo-400" />
            {board}
          </CardTitle>
          <CardDescription className="flex items-center mt-2 text-gray-400">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>Join the discussion</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

interface BoardsViewProps {
  boards: string[]
  loggedIn: boolean
}

export function BoardsView({ boards, loggedIn }: BoardsViewProps) {
  return (
    <div className="overflow-x-hidden h-screen w-screen flex flex-col justify-center">
      <Navbar loggedIn={loggedIn} />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-100">Choose a Board</h1>
            <p className="mt-2 text-gray-400">Explore our diverse communities and join the conversation</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 w-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {boards.map((board) => (
              <BoardCard board={board} key={board} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
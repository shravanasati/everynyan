import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Board } from "@/lib/boards";

function BoardCard({ title, description, href, imageSrc, imageAlt }: Board) {
  return (
    <Card className="w-80 h-72 md:w-96 md:h-72 rounded-lg md:rounded-xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group flex flex-col">
      <div className="relative h-36 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={384}
          height={144}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <CardHeader className="py-3">
          <CardTitle className="text-lg text-primary line-clamp-1 cursor-default">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2 py-2 flex-grow">
          <p className="text-sm text-muted-foreground flex-grow line-clamp-3 cursor-default">
            {description}
          </p>
          <Link
            href={`/board/${href}`}
            className="rounded-full p-2 transition-colors hover:bg-secondary flex-shrink-0"
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}

interface BoardsViewProps {
  boards: Board[];
}

export function BoardsView({ boards }: BoardsViewProps) {
  return (
    <main className="min-h-[92vh] flex items-center justify-center py-8 md:py-4">
      <div className="grid grid-cols-1 grid-rows-4 gap-3 md:grid-cols-2 md:grid-rows-2">
        {boards.map((board) => (
          <BoardCard key={board.href} {...board} />
        ))}
      </div>
    </main>
  );
}

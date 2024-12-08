import { Card, CardContent } from "@/components/ui/card"
import { Spline } from "lucide-react"

export function SingleCommentSkeleton({ hasReplies = false, isNested = false }) {
  return (
    <div className="w-full">
      <Card
        className="relative w-full border-none bg-primary/[0.0225]"
      >
        {isNested && (
          <div className="absolute top-0 -left-6 flex items-center justify-center">
            <Spline
              strokeDasharray="1 3"
              strokeDashoffset={0.8}
              className="-rotate-90 w-8 text-border"
              strokeLinecap="square"
            />
          </div>
        )}
        <CardContent className="p-3">
          <div className="rounded-lg bg-primary/[0.015] p-3 mb-3">
            <div className="h-4 bg-primary/10 rounded animate-pulse mb-2" />
            <div className="h-4 bg-primary/10 rounded animate-pulse w-3/4" />
          </div>

          <div className="flex items-center justify-between mt-2 sm:space-y-0">
            <div className="flex items-center justify-between gap-3">
              {hasReplies && (
                <div className="rounded-3xl p-2 bg-primary/10 w-8 h-8" />
              )}
              <div className="bg-primary/10 rounded-full h-6 w-16 animate-pulse" />
            </div>
            <div className="flex items-center justify-end space-x-2 w-full sm:w-auto">
              <div className="bg-primary/10 rounded h-8 w-16 animate-pulse" />
              <div className="bg-primary/10 rounded h-8 w-8 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>

      {hasReplies && (
        <div className="pl-8 relative h-max pt-4 space-y-4">
          <div className="w-[1px] h-full rounded-full bg-transparent border absolute left-[0.8rem] top-0 overflow-hidden border-dashed" />
          <SingleCommentSkeleton isNested={true} />
          <SingleCommentSkeleton isNested={true} />
        </div>
      )}
    </div>
  )
}

export function LoadingComments() {
  return (
    <div className="space-y-4">
      <SingleCommentSkeleton hasReplies={true} />
      <SingleCommentSkeleton />
      <SingleCommentSkeleton hasReplies={true} />
    </div>
  )
}


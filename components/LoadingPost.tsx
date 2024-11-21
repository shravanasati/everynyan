function LoadingPost() {
  return (
    <div className="w-full min-h-[12rem] my-2 rounded-sm shadow-md bg-card">
      <div className="p-3 sm:p-4 border-border">
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-start sm:space-y-0 sm:space-x-4">
          <div className="h-6 w-3/4 sm:w-2/3 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-1/4 sm:w-1/6 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
      <div className="p-3 sm:p-4 border-border flex flex-wrap items-center justify-start gap-2 sm:gap-3">
        <div className="w-full sm:w-auto flex flex-wrap items-center justify-start gap-2 sm:gap-3">
          <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
}

function CaughtUp() {
  return (
    <div className="w-full py-8 flex justify-center items-center">
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">
          You&apos;re all caught up here!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Check back later for new content
        </p>
      </div>
    </div>
  );
}

export { LoadingPost, CaughtUp };

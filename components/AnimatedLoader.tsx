export default function AnimatedLoader() {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
        </div>
        <div className="text-foreground text-2xl font-semibold">
          Sata Andagi
        </div>
      </div>
    </div>
  );
}

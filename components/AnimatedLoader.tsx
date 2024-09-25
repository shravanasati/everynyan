export default function AnimatedLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-zinc-900 rounded-full border-2 border-zinc-800"></div>
        </div>
        <div className="text-zinc-100 text-2xl font-semibold">Sata Andagi</div>
      </div>
    </div>
  );
}

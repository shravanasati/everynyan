import BoardHeader from "@/components/BoardHeader";
import BlobGradient from "@/components/Gradients/BlobGradient";
import { InfiniteScrollingPosts } from "@/components/InfiniteScrollingPosts";
import Section1 from "@/components/LandingPage/Section1";
import { getAuthUser } from "@/lib/user";

export default async function Home() {
  const user = await getAuthUser();
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <BoardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6 everynyan-scroll">
            <InfiniteScrollingPosts boardName={null} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden flex-col justify-center items-center min-h-screen">
      <BlobGradient className="absolute inset-0 -z-50 h-[970px] md:h-[900px] -bottom-50" />
      <Section1 />
    </div>
  );
}

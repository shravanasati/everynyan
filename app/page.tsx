import BoardHeader from "@/components/BoardHeader";
import { Dock } from "@/components/Dock";
import Footer from "@/components/Footer";
import BlobGradient from "@/components/Gradients/GradientBackground";
import { InfiniteScrollingPosts } from "@/components/InfiniteScrollingPosts";
import Section1 from "@/components/LandingPage/Section1";
import Section2 from "@/components/LandingPage/Section2";
import Section3 from "@/components/LandingPage/Section3";
import { getPostsFeed } from "@/lib/firebase/posts";
import { getAuthUser } from "@/lib/user";
import { AnimatePresence } from "framer-motion";

export default async function Home() {
  const user = await getAuthUser();

  if (user) {
    // todo get preferences from local storage
    const resp = await getPostsFeed();
    const data = JSON.stringify(resp);
    return (
      <div className="min-h-screen bg-background relative">
        <BoardHeader />
        <Dock />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6 everynyan-scroll">
            <InfiniteScrollingPosts boardName={null} data={data} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden flex-col justify-center items-center w-full min-h-full scroll-smooth scroll-snap-y-mandatory">
      <AnimatePresence mode="wait">
        <BlobGradient className="absolute inset-0 -z-50 h-[970px] md:h-[900px] -bottom-50" />
        <Section1 />
        <Section2 />
        <Section3 />
        <Footer />
      </AnimatePresence>
    </div>
  );
}

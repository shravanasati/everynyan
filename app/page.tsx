import BlobGradient from "@/components/Gradients/BlobGradient";
import Section1 from "@/components/LandingPage/Section1";
import Section2 from "@/components/LandingPage/Section2";

export default async function Home() {
  return (
    <div className="overflow-x-hidden flex-col justify-center items-center min-h-screen">
      <BlobGradient className="absolute inset-0 -z-50 md:h-[1000px] md::w-[1000px]" />
      <Section1 />
      <Section2 />
    </div>
  );
}

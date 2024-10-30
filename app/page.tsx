import BlobGradient from "@/components/Gradients/BlobGradient";
import Section1 from "@/components/LandingPage/Section1";
import Section2 from "@/components/LandingPage/Section2";

export default async function Home() {
  return (
    <div className="overflow-x-hidden flex-col justify-center items-center min-h-screen">
      <BlobGradient className="absolute inset-0 z-0 md:h-[800px] md::w-[800px] -bottom-50" />
      <Section1 />
      <Section2 />
    </div>
  );
}

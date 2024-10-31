import BlobGradient from "@/components/Gradients/BlobGradient";
import Section1 from "@/components/LandingPage/Section1";

export default async function Home() {
  return (
    <div className="overflow-x-hidden flex-col justify-center items-center min-h-screen">
      <BlobGradient className="absolute inset-0 -z-50 h-[970px] md:h-[900px] -bottom-50" />
      <Section1 />
    </div>
  );
}

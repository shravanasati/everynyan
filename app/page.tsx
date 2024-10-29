import BlobGradient from "@/components/Gradients/BlobGradient";
import Section1 from "@/components/LandingPage/Section1";
import Navbar from "@/components/Navbar";
import { isLoggedIn } from "@/lib/user";

export default async function Home() {
  const loggedIn = await isLoggedIn();

  return (
    <div className="overflow-x-hidden flex-col justify-center items-center min-h-screen">
      <BlobGradient className="absolute inset-0 -top-[150px] -left-[850px] -z-50"/>

      <Navbar loggedIn={loggedIn} />
      <Section1 />
    </div>
  );
}

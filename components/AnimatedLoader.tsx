import Image from "next/image";

export default function AnimatedLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image src="/loadcat.gif" height={100} width={100} alt="meow meow" />
    </div>
  );
}

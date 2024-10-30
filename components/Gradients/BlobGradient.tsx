"use client";
import { cn } from "@/lib/utils";
import { easeOut, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function BlobGradient({ className }: { className?: string }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const blobRef = useRef<HTMLDivElement>(null);
  const blobPos = blobRef.current?.getBoundingClientRect();
  const blobLeft = blobPos?.left ?? 0;
  const blobTop = blobPos?.top ?? 0;
  const blobWidth = blobPos?.width ?? 0;
  const blobgHeight = blobPos?.height ?? 0;

  const blobCenterX = blobLeft + blobWidth / 2;
  const blobCenterY = blobTop + blobgHeight / 2;

  const diffX = mouse.x - blobCenterX;
  const diffY = mouse.y - blobCenterY;

  function mouseHandler(e: MouseEvent) {
    setMouse({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", mouseHandler);
    return () => {
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen justify-center items-center overflow-hidden",
        className
      )}
    >
      <div className="blur-[250px] md:blur-[180px] max-w-full h-screen flex items-center justify-center">
        <motion.div
          ref={blobRef}
          animate={{
            translateX: diffX * 0.1,
            translateY: diffY * 0.1,
          }}
          transition={{
            ease: easeOut,
          }}
        >
          <svg
            id="visual"
            viewBox="0 0 900 900"
            width="800px"
            height="800px"
            preserveAspectRatio="xMidYMid meet"
            className="md:scale-100"
          >
            <g transform="translate(450 450)">
              <motion.path
                d="M285 -263.5C357.8 -212.1 397.4 -106.1 392.6 -4.8C387.7 96.4 338.5 192.8 265.6 251.5C192.8 310.1 96.4 331.1 16 315C-64.3 299 -128.7 246 -178 187.4C-227.4 128.7 -261.7 64.3 -256 5.7C-250.4 -53 -204.7 -106.1 -155.4 -157.4C-106.1 -208.7 -53 -258.4 26.5 -284.9C106.1 -311.4 212.1 -314.8 285 -263.5"
                fill="#FCAF3C"
                animate={{
                  d: [
                    "M131.4 -120.2C167.6 -95.2 192.3 -47.6 189 -3.3C185.7 41 154.4 82 118.2 131.7C82 181.4 41 239.7 -6.1 245.8C-53.3 251.9 -106.5 205.9 -148.9 156.2C-191.2 106.5 -222.6 53.3 -231.3 -8.7C-240 -70.7 -226.1 -141.4 -183.8 -166.4C-141.4 -191.4 -70.7 -170.7 -11.5 -159.2C47.6 -147.6 95.2 -145.2 131.4 -120.2",
                    "M164.2 -162.7C190.7 -137.7 174.8 -68.8 171.2 -3.7C167.5 61.5 176 123 149.5 173C123 223 61.5 261.5 1.2 260.3C-59.2 259.2 -118.3 218.3 -156.3 168.3C-194.3 118.3 -211.2 59.2 -204.4 6.7C-197.7 -45.7 -167.5 -91.5 -129.5 -116.5C-91.5 -141.5 -45.7 -145.7 11.5 -157.3C68.8 -168.8 137.7 -187.7 164.2 -162.7",
                    "M166.4 -185.1C191.4 -141.4 170.7 -70.7 169.5 -1.2C168.4 68.4 186.7 136.7 161.7 177.4C136.7 218 68.4 231 -0.1 231.1C-68.6 231.3 -137.2 218.5 -185.3 177.8C-233.5 137.2 -261.3 68.6 -247 14.3C-232.7 -40.1 -176.5 -80.1 -128.3 -123.8C-80.1 -167.5 -40.1 -214.7 15.3 -230.1C70.7 -245.4 141.4 -228.8 166.4 -185.1",
                  ],
                  fill: ["#9c7e00", "#bf9a00", "#d0a800"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  duration: 2,
                }}
              />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
  size = 56,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
  /** Avatar size in pixels; adjusts tooltip spacing responsively */
  size?: number;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  // avatar size animation when size prop changes
  const avatarSizeTarget = useMotionValue(size);
  useEffect(() => {
    avatarSizeTarget.set(size);
  }, [size, avatarSizeTarget]);
  const avatarSize = useSpring(avatarSizeTarget, { stiffness: 260, damping: 26, mass: 0.6 });
  // No mouse-based horizontal tracking; keep tooltip centered over avatar
  // Tooltip vertical offset scales with avatar size (animated)
  const tooltipOffset = useTransform(avatarSize, (v) => Math.round(v * 1.15));
  const negativeTooltipOffset = useTransform(tooltipOffset, (t) => -t);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {items.map((item, idx) => (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9, x: -8 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="-mr-4  relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                layout={false}
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: 0,
                  rotate: 0,
                  whiteSpace: "nowrap",
                  top: negativeTooltipOffset,
                  left: "50%",
                  transform: "translateX(-50%)",
                  willChange: "transform, opacity",
                }}
                className="pointer-events-none absolute flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: avatarSize, height: avatarSize }}
            className="relative !m-0 !p-0 rounded-full border-2 group-hover:scale-105 group-hover:z-30 border-white transition duration-300"
          >
            <Image
              fill
              sizes="(max-width: 640px) 20px, (max-width: 1024px) 40px, 56px"
              src={item.image}
              alt={item.name}
              className="object-cover object-top rounded-full"
            />
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

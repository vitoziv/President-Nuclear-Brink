"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { GameEvent } from "@/lib/types";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CardProps {
  event: GameEvent;
  imageUrl: string | null;
  onDecision: (choice: "left" | "right") => void;
  onPreview: (choice: "left" | "right" | null) => void;
}

export function Card({ event, imageUrl, onDecision, onPreview }: CardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  
  const leftIndicatorOpacity = useTransform(x, [-50, -100], [0, 1]);
  const rightIndicatorOpacity = useTransform(x, [50, 100], [0, 1]);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (latest < -50) {
        onPreview("left");
      } else if (latest > 50) {
        onPreview("right");
      } else {
        onPreview(null);
      }
    });
    return () => unsubscribe();
  }, [x, onPreview]);

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    onPreview(null);
    if (info.offset.x < -100) {
      onDecision("left");
    } else if (info.offset.x > 100) {
      onDecision("right");
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragSnapToOrigin={true}
      dragElastic={0.8}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      className="relative w-80 h-[400px] bg-zinc-800 rounded-3xl shadow-2xl border border-zinc-700 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing z-10"
      whileTap={{ scale: 0.95 }}
    >
      {/* Image Area */}
      <div className="relative flex-1 bg-zinc-900 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={event.characterName} fill className="object-cover" unoptimized />
        ) : (
          <div className="animate-pulse w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center">
            <span className="text-zinc-600 text-xs text-center px-4">加载图片中...</span>
          </div>
        )}
        
        {/* Choice Indicators */}
        <motion.div 
          style={{ opacity: leftIndicatorOpacity }}
          className="absolute top-4 left-4 right-4 text-center text-white font-bold text-lg bg-black/60 p-3 rounded-xl backdrop-blur-md pointer-events-none"
        >
          {event.leftChoice.text}
        </motion.div>
        <motion.div 
          style={{ opacity: rightIndicatorOpacity }}
          className="absolute top-4 left-4 right-4 text-center text-white font-bold text-lg bg-black/60 p-3 rounded-xl backdrop-blur-md pointer-events-none"
        >
          {event.rightChoice.text}
        </motion.div>
      </div>

      {/* Character Name */}
      <div className="h-16 bg-zinc-800 flex items-center justify-center border-t border-zinc-700">
        <h3 className="text-white font-bold text-xl tracking-tight">{event.characterName}</h3>
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { GameState, GameEvent, StatEffects } from "@/lib/types";
import { BASE_EVENTS } from "@/lib/events";
import { generateCharacterImage, generateDynamicEvents } from "@/lib/gemini";
import { StatBar } from "./StatBar";
import { Card } from "./Card";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_STATE: GameState = {
  approval: 50,
  economy: 50,
  military: 50,
  diplomacy: 50,
  turn: 1,
  gameOver: false,
  gameOverReason: "",
};

export function Game() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [eventQueue, setEventQueue] = useState<GameEvent[]>(() => {
    return [...BASE_EVENTS].sort(() => Math.random() - 0.5);
  });
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(() => eventQueue[0]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewEffects, setPreviewEffects] = useState<StatEffects | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageCache, setImageCache] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch image when event changes
  useEffect(() => {
    if (!currentEvent) return;

    const fetchImage = async () => {
      const type = currentEvent.characterType;
      if (imageCache[type]) {
        setImageUrl(imageCache[type]);
        return;
      }

      setImageUrl(null); // Show loading state
      const url = await generateCharacterImage(type);
      if (url) {
        setImageCache((prev) => ({ ...prev, [type]: url }));
        setImageUrl(url);
      }
    };

    fetchImage();
  }, [currentEvent, imageCache]);

  // Fetch more events if queue is low
  useEffect(() => {
    if (eventQueue.length > 0 && eventQueue.length < 5 && !loading) {
      const fetchMore = async () => {
        const newEvents = await generateDynamicEvents(10);
        if (newEvents.length > 0) {
          setEventQueue((prev) => [...prev, ...newEvents]);
        }
      };
      fetchMore();
    }
  }, [eventQueue.length, loading]);

  const applyEffects = (effects: StatEffects) => {
    setState((prev) => {
      const newState = {
        ...prev,
        approval: Math.max(0, Math.min(100, prev.approval + effects.approval)),
        economy: Math.max(0, Math.min(100, prev.economy + effects.economy)),
        military: Math.max(0, Math.min(100, prev.military + effects.military)),
        diplomacy: Math.max(0, Math.min(100, prev.diplomacy + effects.diplomacy)),
        turn: prev.turn + 1,
      };

      // Check game over conditions
      if (newState.approval <= 0) {
        newState.gameOver = true;
        newState.gameOverReason = "由于民意支持率为零，你被弹劾了。";
      } else if (newState.approval >= 100) {
        newState.gameOver = true;
        newState.gameOverReason = "你成为了独裁者。共和国已不复存在。";
      } else if (newState.economy <= 0) {
        newState.gameOver = true;
        newState.gameOverReason = "经济崩溃。国家已破产。";
      } else if (newState.economy >= 100) {
        newState.gameOver = true;
        newState.gameOverReason = "寡头买下了政府。你不再是掌权者了。";
      } else if (newState.military <= 0) {
        newState.gameOver = true;
        newState.gameOverReason = "外国势力入侵。军队被击败了。";
      } else if (newState.military >= 100) {
        newState.gameOver = true;
        newState.gameOverReason = "军方发动了政变。你被推翻了。";
      } else if (newState.diplomacy <= 0) {
        newState.gameOver = true;
        newState.gameOverReason = "第三次世界大战爆发。核毁灭降临。";
      } else if (newState.diplomacy >= 100) {
        newState.gameOver = true;
        newState.gameOverReason = "世界政府成立。美国丧失了主权。";
      }

      return newState;
    });
  };

  const handleDecision = (choice: "left" | "right") => {
    if (!currentEvent) return;

    const effects = choice === "left" ? currentEvent.leftChoice.effects : currentEvent.rightChoice.effects;
    applyEffects(effects);
    setPreviewEffects(null);

    // Next event
    const newQueue = [...eventQueue];
    newQueue.shift(); // Remove current
    setEventQueue(newQueue);
    
    if (newQueue.length > 0) {
      setCurrentEvent(newQueue[0]);
    } else {
      // Fallback if we run out of events completely
      setCurrentEvent(BASE_EVENTS[Math.floor(Math.random() * BASE_EVENTS.length)]);
    }
  };

  const handlePreview = (choice: "left" | "right" | null) => {
    if (!currentEvent || !choice) {
      setPreviewEffects(null);
      return;
    }
    setPreviewEffects(choice === "left" ? currentEvent.leftChoice.effects : currentEvent.rightChoice.effects);
  };

  const restartGame = () => {
    setState(INITIAL_STATE);
    const shuffled = [...BASE_EVENTS].sort(() => Math.random() - 0.5);
    setEventQueue(shuffled);
    setCurrentEvent(shuffled[0]);
  };

  if (!mounted || loading) {
    return <div className="flex items-center justify-center h-screen bg-zinc-950 text-white">加载中...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 p-4 font-sans overflow-hidden">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        
        {/* Top Bar */}
        <StatBar 
          approval={state.approval} 
          economy={state.economy} 
          military={state.military} 
          diplomacy={state.diplomacy} 
          previewEffects={previewEffects}
        />

        {/* Game Area */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[550px]">
          <AnimatePresence mode="wait">
            {state.gameOver ? (
              <motion.div 
                key="gameover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full z-20"
              >
                <h2 className="text-3xl font-bold text-red-500 mb-4">游戏结束</h2>
                <p className="text-zinc-300 mb-6 text-lg">{state.gameOverReason}</p>
                <p className="text-zinc-500 mb-8">你坚持了 {state.turn} 轮。</p>
                <button 
                  onClick={restartGame}
                  className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  再玩一次
                </button>
              </motion.div>
            ) : currentEvent ? (
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: previewEffects ? (previewEffects === currentEvent.leftChoice.effects ? -200 : 200) : 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-6 absolute"
              >
                <Card 
                  event={currentEvent} 
                  imageUrl={imageUrl} 
                  onDecision={handleDecision} 
                  onPreview={handlePreview} 
                />
                
                {/* Event Description */}
                <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl shadow-xl w-80 text-center min-h-[140px] flex items-center justify-center">
                  <p className="text-zinc-200 text-lg leading-relaxed">{currentEvent.description}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { Users, DollarSign, Shield, Globe } from "lucide-react";

interface StatBarProps {
  approval: number;
  economy: number;
  military: number;
  diplomacy: number;
  previewEffects?: { approval: number; economy: number; military: number; diplomacy: number } | null;
}

export function StatBar({ approval, economy, military, diplomacy, previewEffects }: StatBarProps) {
  const stats = [
    { name: "民意", value: approval, icon: Users, effect: previewEffects?.approval },
    { name: "经济", value: economy, icon: DollarSign, effect: previewEffects?.economy },
    { name: "军事", value: military, icon: Shield, effect: previewEffects?.military },
    { name: "外交", value: diplomacy, icon: Globe, effect: previewEffects?.diplomacy },
  ];

  return (
    <div className="flex justify-between items-center w-full max-w-md px-6 py-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2 relative">
          {/* Dot indicator for preview */}
          <div className={`w-2 h-2 rounded-full transition-opacity duration-200 ${stat.effect && stat.effect !== 0 ? 'opacity-100 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'opacity-0'}`} />
          
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
            {/* Fill circle based on value */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-zinc-300 transition-all duration-500 ease-out"
                strokeDasharray={`${stat.value}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <stat.icon className="w-4 h-4 text-zinc-400 z-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

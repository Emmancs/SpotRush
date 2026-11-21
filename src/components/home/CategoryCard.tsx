import React from 'react';
import { PawPrint, Sparkles, Fish, UtensilsCrossed, Rocket, ChevronRight } from 'lucide-react';
import { Category } from '../../game/types';

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: string) => void;
  levelsCompleted?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  PawPrint: <PawPrint className="w-6 h-6 text-amber-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-purple-400" />,
  Fish: <Fish className="w-6 h-6 text-cyan-400" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-orange-400" />,
  Rocket: <Rocket className="w-6 h-6 text-violet-400" />,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelect,
  levelsCompleted = 0,
}) => {
  return (
    <div
      onClick={() => onSelect(category.id)}
      className="group relative bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500/60 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 flex flex-col justify-between overflow-hidden"
    >
      {/* Background subtle gradient glow on hover */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.themeColor} opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity`} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
            {ICON_MAP[category.icon] || <Sparkles className="w-6 h-6 text-brand-400" />}
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50">
            {category.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold font-fun text-white mb-2 group-hover:text-brand-300 transition-colors">
          {category.name}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold">{levelsCompleted}</span>
          <span>/</span>
          <span>{category.levelsCount} Completed</span>
        </div>

        <div className="flex items-center gap-1 text-brand-400 group-hover:translate-x-1 transition-transform font-semibold">
          <span>Explore</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};


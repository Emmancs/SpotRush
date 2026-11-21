import React from 'react';
import { Home, Compass } from 'lucide-react';
import { Button } from '../components/common/Button';

interface NotFoundPageProps {
  onGoHome: () => void;
  onGoCategories: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onGoHome,
  onGoCategories,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 rounded-3xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-3xl font-fun font-bold text-brand-400 mb-6 shadow-xl">
        404
      </div>
      <h1 className="text-3xl font-extrabold font-fun text-white mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-400 mb-8 text-sm leading-relaxed">
        We searched everywhere, but this puzzle or page seems to have vanished without a trace!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          icon={<Home className="w-4 h-4" />}
          onClick={onGoHome}
          className="w-full sm:w-auto"
        >
          Return Home
        </Button>
        <Button
          variant="secondary"
          size="md"
          icon={<Compass className="w-4 h-4" />}
          onClick={onGoCategories}
          className="w-full sm:w-auto"
        >
          Browse Categories
        </Button>
      </div>
    </div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Play, Database, RefreshCw, BookOpen, GraduationCap } from 'lucide-react';
import { HANZI_BANK } from '../data/hanziData.ts';

interface StartViewProps {
  onStart: () => void;
  onReview: () => void;
  persistentCount: number;
  onGoToResults: () => void;
}

const StartView: React.FC<StartViewProps> = ({ onStart, onReview, persistentCount, onGoToResults }) => {
  const hasReviewItems = persistentCount > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-10"
    >
      <header className="space-y-4">
        <div className="inline-block p-4 bg-brand-pink/20 rounded-full mb-4">
          <BookOpen size={48} className="text-brand-darkPink" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight">
          汉字 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-darkPink to-purple-500">Wonderland</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium">儿童互动汉字学习乐园</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-brand-blue flex flex-col items-center">
          <div className="flex items-center gap-3 text-brand-blue mb-2">
            <Database size={24} />
            <span className="font-bold text-lg">总字数</span>
          </div>
          <p className="text-4xl font-black text-gray-800">{HANZI_BANK.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-red-200 flex flex-col items-center cursor-pointer hover:bg-red-50 transition-colors" onClick={onGoToResults}>
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <RefreshCw size={24} />
            <span className="font-bold text-lg">生词本</span>
          </div>
          <p className="text-4xl font-black text-red-500">{persistentCount}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
        <button 
          onClick={onStart}
          className="group flex-1 relative inline-flex items-center justify-center px-8 py-5 text-lg font-black text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <Play className="mr-3 fill-current" />
          学习新字 (50)
        </button>

        {hasReviewItems && (
          <button 
            onClick={onReview}
            className="group flex-1 relative inline-flex items-center justify-center px-8 py-5 text-lg font-black text-white transition-all duration-200 bg-gradient-to-r from-red-400 to-pink-500 rounded-full focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-pink-500 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <GraduationCap className="mr-3" />
            复习生词 ({persistentCount})
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default StartView;

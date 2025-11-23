import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowLeft } from 'lucide-react';
import Flashcard from './Flashcard';
import { HanziChar } from '../types';

interface QuizViewProps {
  currentSet: HanziChar[];
  currentIndex: number;
  onNext: (remembered: boolean) => void;
  onQuit: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ currentSet, currentIndex, onNext, onQuit }) => {
  const currentHanzi = currentSet[currentIndex];
  const progress = Math.round(((currentIndex) / currentSet.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onQuit}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex-1 mx-8">
          <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
            <span>学习进度</span>
            <span>{currentIndex + 1} / {currentSet.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-darkPink rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <div className="mb-12">
        <Flashcard char={currentHanzi} />
      </div>

      <div className="flex justify-center gap-6 md:gap-12">
        <button
          onClick={() => onNext(false)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-20 h-20 rounded-full bg-white border-4 border-red-200 shadow-lg flex items-center justify-center group-hover:bg-red-50 group-hover:scale-110 transition-all duration-200">
            <X size={40} className="text-red-400" />
          </div>
          <span className="font-bold text-gray-400 text-sm tracking-wider">不记得</span>
        </button>

        <button
          onClick={() => onNext(true)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-20 h-20 rounded-full bg-white border-4 border-green-200 shadow-lg flex items-center justify-center group-hover:bg-green-50 group-hover:scale-110 transition-all duration-200">
            <Check size={40} className="text-green-500" />
          </div>
          <span className="font-bold text-gray-400 text-sm tracking-wider">记住了</span>
        </button>
      </div>
    </div>
  );
};

export default QuizView;
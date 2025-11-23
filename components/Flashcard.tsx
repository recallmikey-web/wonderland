import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HanziChar } from '../types.ts';
import { Lightbulb } from 'lucide-react';

interface FlashcardProps {
  char: HanziChar;
}

const Flashcard: React.FC<FlashcardProps> = ({ char }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when char changes
  useEffect(() => {
    setIsFlipped(false);
  }, [char]);

  return (
    <div 
      className="relative w-full max-w-sm mx-auto h-[500px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-[2.5rem] shadow-xl border-4 border-brand-darkPink flex flex-col items-center justify-center z-10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-6 right-6 text-brand-darkPink animate-pulse">
            <Lightbulb size={32} />
          </div>
          <div className="text-[10rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-lg filter">
            {char.char}
          </div>
          <p className="mt-8 text-gray-400 text-lg font-bold uppercase tracking-widest">点击翻转</p>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-yellow to-white rounded-[2.5rem] shadow-xl border-4 border-brand-yellow flex flex-col items-center justify-center p-8"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full text-center space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">拼音</p>
              <h3 className="text-4xl font-mono font-bold text-blue-600 mt-1">{char.pinyin}</h3>
            </div>
            
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">含义</p>
              <h4 className="text-2xl font-bold text-gray-800 mt-1">{char.meaning}</h4>
            </div>

            <div className="bg-white/60 p-4 rounded-xl border-2 border-brand-yellow mt-4">
              <div className="flex items-center justify-center gap-2 mb-2 text-orange-500 font-bold">
                <Lightbulb size={20} />
                <span>记忆联想</span>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">
                {char.visualization}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;

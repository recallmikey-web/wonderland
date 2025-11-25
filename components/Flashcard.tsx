import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HanziChar } from '../types.ts';
import { Lightbulb, Volume2 } from 'lucide-react';

interface FlashcardProps {
  char: HanziChar;
}

const Flashcard: React.FC<FlashcardProps> = ({ char }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when char changes
  useEffect(() => {
    setIsFlipped(false);
  }, [char]);

  // Text-to-Speech function
  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking audio
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(char.char);
      utterance.lang = 'zh-CN'; // Set language to Chinese
      utterance.rate = 0.8; // Slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    } else {
      alert("您的浏览器不支持语音朗读功能");
    }
  };

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
          {/* Audio Button */}
          <button 
            onClick={playAudio}
            className="absolute top-6 left-6 p-3 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 hover:scale-110 transition-all shadow-sm z-20"
            title="点击朗读"
          >
            <Volume2 size={28} />
          </button>

          <div className="absolute top-6 right-6 text-brand-darkPink animate-pulse">
            <Lightbulb size={32} />
          </div>
          
          {/* Hanzi Display - Changed to KaiTi font */}
          <div className="font-kaiti text-[10rem] leading-none font-normal text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-lg filter">
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
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-4xl font-mono font-bold text-blue-600 mt-1">{char.pinyin}</h3>
                <button 
                  onClick={playAudio}
                  className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>
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

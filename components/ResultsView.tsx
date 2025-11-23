import React from 'react';
import { motion } from 'framer-motion';
import { Home, Trash2, RotateCcw, Trophy } from 'lucide-react';
import { HanziChar } from '../types';

interface ResultsViewProps {
  sessionForgotten: HanziChar[];
  persistentForgotten: string[];
  onRestart: () => void;
  onClear: () => void;
  onHome: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  sessionForgotten, 
  persistentForgotten, 
  onRestart, 
  onClear,
  onHome
}) => {
  const isPerfect = sessionForgotten.length === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl mx-auto px-6 py-10"
    >
      <div className="text-center mb-12">
        {isPerfect ? (
          <div className="inline-block p-6 bg-yellow-100 rounded-full mb-6 animate-bounce">
            <Trophy size={64} className="text-yellow-600" />
          </div>
        ) : null}
        <h2 className="text-4xl font-black text-gray-800 mb-4">
          {isPerfect ? '太棒了！完美通关！🎉' : '本轮学习结束！'}
        </h2>
        <p className="text-xl text-gray-500">来看看你的学习成果。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Session Stats */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border-4 border-red-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-700">本轮未掌握</h3>
            <span className="bg-red-100 text-red-600 font-black px-4 py-1 rounded-full">{sessionForgotten.length}</span>
          </div>
          
          {sessionForgotten.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {sessionForgotten.map((char, idx) => (
                <div key={idx} className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center text-3xl font-black text-red-500 border-2 border-red-200">
                  {char.char}
                </div>
              ))}
            </div>
          ) : (
             <div className="h-32 flex items-center justify-center text-gray-400 italic">
               全部掌握！你是小明星！🌟
             </div>
          )}
        </div>

        {/* Total Persistent Stats */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border-4 border-blue-100">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold text-gray-700">累计复习库</h3>
             <span className="bg-blue-100 text-blue-600 font-black px-4 py-1 rounded-full">{persistentForgotten.length}</span>
          </div>
          
          <div className="flex flex-wrap gap-3 max-h-[300px] overflow-y-auto custom-scrollbar">
            {persistentForgotten.map((char, idx) => (
              <div key={idx} className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-500 border border-blue-200">
                {char}
              </div>
            ))}
            {persistentForgotten.length === 0 && (
              <div className="w-full h-32 flex items-center justify-center text-gray-400 italic">
                复习库是空的，真棒！
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
         <button onClick={onRestart} className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-darkPink hover:bg-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <RotateCcw size={20} />
            再来一轮
         </button>
         
         <button onClick={onHome} className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-full shadow-lg border-2 border-gray-100 transition-all hover:-translate-y-1">
            <Home size={20} />
            返回首页
         </button>

         {persistentForgotten.length > 0 && (
           <button onClick={onClear} className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold rounded-full shadow-lg transition-all hover:-translate-y-1">
              <Trash2 size={20} />
              清空记录
           </button>
         )}
      </div>
    </motion.div>
  );
};

export default ResultsView;
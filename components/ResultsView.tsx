import React from 'react';
import { motion } from 'framer-motion';
import { Home, Trash2, RotateCcw, Trophy } from 'lucide-react';
import { HanziChar } from '../types.ts';

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
          {isPerfect ? "太棒了！全部记住啦！" : "学习完成！"}
        </h2>
        <p className="text-xl text-gray-500 font-medium">
          本次复习了 {sessionForgotten.length === 0 ? "全部" : "部分"} 汉字
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-red-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">本次需加强</h3>
            <span className="bg-red-100 text-red-600 font-black px-4 py-2 rounded-full">
              {sessionForgotten.length}
            </span>
          </div>
          {sessionForgotten.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
              {sessionForgotten.map((char, i) => (
                <div key={i} className="aspect-square bg-red-50 rounded-xl flex items-center justify-center text-2xl font-black text-red-500 border border-red-100">
                  {char.char}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 font-medium">
              没有未记住的字，真棒！
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-indigo-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">生词本</h3>
            <span className="bg-indigo-100 text-indigo-600 font-black px-4 py-2 rounded-full">
              {persistentForgotten.length}
            </span>
          </div>
          {persistentForgotten.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {persistentForgotten.map((char, i) => (
                <div key={i} className="aspect-square bg-indigo-50 rounded-xl flex items-center justify-center text-2xl font-black text-indigo-500 border border-indigo-100">
                  {char}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 font-medium">
              生词本空空如也
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onHome}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-50 transition-colors"
        >
          <Home size={20} />
          返回首页
        </button>
        
        {persistentForgotten.length > 0 && (
          <button 
            onClick={onClear}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-red-200 text-red-500 rounded-full font-bold hover:bg-red-50 transition-colors"
          >
            <Trash2 size={20} />
            清空生词本
          </button>
        )}

        <button 
          onClick={onRestart}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
        >
          <RotateCcw size={20} />
          再来一组
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsView;
import React, { useState, useEffect } from 'react';
import { HANZI_BANK } from './data/hanziData';
import { AppState, HanziChar } from './types';
import StartView from './components/StartView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';

const CHARS_PER_SET = 20;
const STORAGE_KEY = 'hanzi_forgotten_list_v2';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'start',
    currentSet: [],
    currentIndex: 0,
    sessionForgotten: [],
    persistentForgotten: []
  });

  // Load persistent data on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean data: Ensure chars actually exist in DB
        const validChars = parsed.filter((c: string) => HANZI_BANK.some(h => h.char === c));
        setState(s => ({ ...s, persistentForgotten: validChars }));
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }, []);

  // Save persistent data when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.persistentForgotten));
  }, [state.persistentForgotten]);

  const handleStartSession = () => {
    // Randomize and pick subset
    const shuffled = [...HANZI_BANK].sort(() => 0.5 - Math.random());
    const subset = shuffled.slice(0, CHARS_PER_SET);
    
    setState(s => ({
      ...s,
      view: 'quiz',
      currentSet: subset,
      currentIndex: 0,
      sessionForgotten: []
    }));
  };

  const handleNextChar = (remembered: boolean) => {
    const currentHanzi = state.currentSet[state.currentIndex];
    
    // Update session stats
    let newSessionForgotten = [...state.sessionForgotten];
    if (!remembered) {
      newSessionForgotten.push(currentHanzi);
    }

    // Check if end of quiz
    if (state.currentIndex >= state.currentSet.length - 1) {
      // Calculate new persistent list (add new forgotten ones, keep old ones, deduplicate)
      const newForgottenChars = newSessionForgotten.map(h => h.char);
      const uniquePersistent = Array.from(new Set([...state.persistentForgotten, ...newForgottenChars]));

      setState(s => ({
        ...s,
        view: 'results',
        sessionForgotten: newSessionForgotten,
        persistentForgotten: uniquePersistent
      }));
    } else {
      // Next card
      setState(s => ({
        ...s,
        sessionForgotten: newSessionForgotten,
        currentIndex: s.currentIndex + 1
      }));
    }
  };

  const handleClearHistory = () => {
    if (confirm("确定要清空所有的复习记录吗？此操作不可撤销！")) {
      setState(s => ({ ...s, persistentForgotten: [] }));
    }
  };

  const handleGoHome = () => {
    setState(s => ({ ...s, view: 'start' }));
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-12">
      <main className="container mx-auto pt-8">
        {state.view === 'start' && (
          <StartView 
            onStart={handleStartSession} 
            persistentCount={state.persistentForgotten.length}
            onGoToResults={() => setState(s => ({...s, view: 'results'}))}
          />
        )}
        
        {state.view === 'quiz' && (
          <QuizView 
            currentSet={state.currentSet}
            currentIndex={state.currentIndex}
            onNext={handleNextChar}
            onQuit={handleGoHome}
          />
        )}

        {state.view === 'results' && (
          <ResultsView 
            sessionForgotten={state.sessionForgotten}
            persistentForgotten={state.persistentForgotten}
            onRestart={handleStartSession}
            onClear={handleClearHistory}
            onHome={handleGoHome}
          />
        )}
      </main>
    </div>
  );
};

export default App;
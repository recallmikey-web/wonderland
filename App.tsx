import React, { useState, useEffect } from 'react';
import { HANZI_BANK } from './data/hanziData.ts';
import { AppState } from './types.ts';
import StartView from './components/StartView.tsx';
import QuizView from './components/QuizView.tsx';
import ResultsView from './components/ResultsView.tsx';

// Changed from 20 to 50 as requested
const CHARS_PER_SET = 50;
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

  // Start standard random session
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

  // Start review session (only words from persistent list)
  const handleStartReview = () => {
    if (state.persistentForgotten.length === 0) return;

    // Filter HANZI_BANK to get full objects for the strings in persistentForgotten
    const reviewSet = HANZI_BANK.filter(char => 
      state.persistentForgotten.includes(char.char)
    );

    // Shuffle the review set for variety
    const shuffledReview = reviewSet.sort(() => 0.5 - Math.random());

    setState(s => ({
      ...s,
      view: 'quiz',
      currentSet: shuffledReview,
      currentIndex: 0,
      sessionForgotten: [] // Reset session tracking for this new review
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
      // Calculate new persistent list
      // Logic: 
      // 1. If "Remembered" in Quiz: It stays in persistent list? Usually spaced repetition keeps it, 
      //    but for this simple app, maybe we should remove it if they remembered it during REVIEW mode?
      //    For now, let's stick to: Add new forgotten ones to the list.
      
      const newForgottenChars = newSessionForgotten.map(h => h.char);
      const uniquePersistent = Array.from(new Set([...state.persistentForgotten, ...newForgottenChars]));

      // Optional: If you want "Review Mode" to clear words they remembered:
      // (Current implementation is safe: it only adds. Users clear manually via Results view)

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
            onReview={handleStartReview}
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

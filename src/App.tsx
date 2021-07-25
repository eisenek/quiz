import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import { Quiz } from './components/Quiz.component';
import { QuizContextProvider } from './hooks/useQuizContext';

export const CONFIG_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export const CONFIG_NO_QUESTIONS = 10
export type DifficultyLevel = typeof CONFIG_DIFFICULTIES[number] | null;

function App() {
  
  return (
    <div className="App">
      <Container component="div" fixed>
        <QuizContextProvider>
          <Quiz />
        </QuizContextProvider>
      </Container>

    </div>
  );
}

export default App;

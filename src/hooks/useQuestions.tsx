import React from 'react';
import { CONFIG_NO_QUESTIONS, DifficultyLevel } from '../App';
import { QuestionDTO } from '../data/QuestionDTO';

export const useQuestions = (difficulty: DifficultyLevel, onQuestionsLoaded: (questionCollection: QuestionDTO[]) => any) => {
  const [questions, setQuestions] = React.useState<QuestionDTO[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true)
        const url = `https://opentdb.com/api.php?amount=${CONFIG_NO_QUESTIONS}&amp;difficulty=${difficulty}&amp;type=boolean&encode=base64`;
        const response = await fetch(url);
        if(!response.ok) {
          const error = await handleError(response);
          setError(error);
        }
        const {results} = await response.json();
        onQuestionsLoaded ? onQuestionsLoaded(normalizeQuestions(results)) : setQuestions(results);
      } catch(err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    difficulty && getQuestions();
    return () => {
      setLoading(false);
      setQuestions([]);
    }
  }, [difficulty])

  return {error, loading, questions}
}

const normalizeQuestions = (questions: any) => questions.map((question: QuestionDTO) => Object.fromEntries(Object.entries(question).map(([key, value]) => [key, Array.isArray(value) ? value.map(val => atob(val)) : atob(value as string)])))

const handleError = async (error: Response) => {
  try {
    // while error is JSON
    const errorText = await error.text();
    return JSON.parse(errorText);
  } catch(err) {
    // while error is text
    return err
  }
}

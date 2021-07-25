import { DifficultyLevel } from "../App";

export type QuestionDTO = {
  category: string;
  type: string;
  difficulty: DifficultyLevel;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

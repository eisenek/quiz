import * as React from "react";
import { DifficultyLevel } from "../App";
import { QuestionDTO } from "../data/QuestionDTO";
export type Action =
  | { type: "setDifficulty"; payload: DifficultyLevel }
  | {
      type: "setQuestionCollection";
      payload: State["questionCollection"];
    }
  | {
      type: "addAnswer";
      payload: State["answerCollection"][number];
    }
  | {
      type: "reset";
    };
export type Dispatch = (action: Action) => void;
export type State = {
  difficulty: DifficultyLevel;
  questionCollection: QuestionDTO[];
  answerCollection: boolean[];
};
export type QuizContextValueType = {
  state: State;
  dispatch: Dispatch;
};

const initialState = {
  difficulty: null,
  questionCollection: [],
  answerCollection: []
}

const quizReducer = (state: State, action: Action | any) => {
  switch (action.type) {
    case "setDifficulty": {
      return { ...state, difficulty: action.payload };
    }
    case "setQuestionCollection": {
      return { ...state, questionCollection: action.payload };
    }
    case "addAnswer": {
      const newAnswerCollection = [...state.answerCollection, action.payload];
      return { ...state, answerCollection: newAnswerCollection };
    }
    case "reset": {
      return initialState
    }
    default: {
      throw new Error(
        `Missing implementation for action type: ${(action as any).type}`
      );
    }
  }
};

const QuizContext = React.createContext<
  { state: State; dispatch: Dispatch }>({state: {difficulty: null, questionCollection: [], answerCollection: []}, dispatch: () => void 0});

const QuizContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = React.useReducer(quizReducer, {
    difficulty: null,
    questionCollection: [],
    answerCollection: [],
  });
  const value = { state, dispatch };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
const useQuizContext = () => React.useContext(QuizContext);

export { QuizContextProvider, useQuizContext };

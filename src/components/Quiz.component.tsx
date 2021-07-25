import { CircularProgress, Fade } from "@material-ui/core";
import { CONFIG_NO_QUESTIONS } from "../App";
import { QuestionDTO } from "../data/QuestionDTO";
import { useQuestions } from "../hooks/useQuestions";
import { useQuizContext } from "../hooks/useQuizContext";
import { Difficulty } from "../pages/difficulty";
import { Questionaire } from "../pages/questionaire";
import { Scores } from "../pages/scores";

export const Quiz = (): JSX.Element | null => {
  const {state, dispatch} = useQuizContext();
  const questionsLoadedCallback = (questions: QuestionDTO[]) => dispatch({type: 'setQuestionCollection', payload: questions})
  const {loading, questions} = useQuestions(state.difficulty, questionsLoadedCallback);
  if(!state.difficulty) {
    return renderDifficulty();
  }

  if(state.questionCollection.length && state.answerCollection.length < CONFIG_NO_QUESTIONS) {
    return renderQuestionnaire(loading, state);
  }

  if(state.answerCollection.length === 10) {
    return renderScores();
  }

  return <Fade in={true}><CircularProgress /></Fade>;
}

const renderDifficulty = (): JSX.Element => <Fade in={true}>
  <Difficulty />
</Fade>

const renderQuestionnaire = (loading: boolean, state: any): JSX.Element => <Fade in={true}>
  {loading && state.questionCollection.length ? <CircularProgress /> : <Questionaire />}
</Fade>

const renderScores = () => <Fade in={true}>
  <Scores />
</Fade>

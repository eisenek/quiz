import { Box, CircularProgress, Fade, makeStyles, Paper } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { ErrorObject } from "use-error-boundary/lib/ErrorBoundary";
import { CONFIG_NO_QUESTIONS } from "../App";
import { QuestionDTO } from "../data/QuestionDTO";
import { useQuestions } from "../hooks/useQuestions";
import { useQuizContext } from "../hooks/useQuizContext";
import { Difficulty } from "../pages/difficulty";
import { Questionaire } from "../pages/questionaire";
import { Scores } from "../pages/scores";

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    padding: theme.spacing(5),
    margin: 'auto',
    width: '100%'
  },
}));

type Props = {
  error?: ErrorObject
}

export const Quiz: React.FC<Props> = (props): JSX.Element | null => {
  const classes = useStyles();
  const { state, dispatch } = useQuizContext();
  const questionsLoadedCallback = (questions: QuestionDTO[]) =>
    dispatch({ type: "setQuestionCollection", payload: questions });
  const difficulty = props.error ? null : state.difficulty;
  const { loading, error } = useQuestions(difficulty, questionsLoadedCallback);
  let children = (
    <Fade in={true}>
      <CircularProgress />
    </Fade>
  );

  const currentQuestion = state.questionCollection[state.answerCollection.length];

  if(error) {
    throw error;
  }
  if (props?.error) {
    children = renderError(props.error);
  }
  if (!state.difficulty) {
    children = renderDifficulty();
  }

  if (
    currentQuestion
  ) {
    children = renderQuestionnaire(loading, state);
  }

  if (state.answerCollection.length === CONFIG_NO_QUESTIONS) {
    children = renderScores();
  }

  return (
    <Paper elevation={3}>
    <Box
      className={classes.quizContainer}
    >{children}
    </Box>
    </Paper>
  );
};

const renderDifficulty = (): JSX.Element => (
  <Fade in={true}>
    <Difficulty />
  </Fade>
);

const renderQuestionnaire = (loading: boolean, state: any): JSX.Element => (
  <Fade in={true}>
    {loading && state.questionCollection.length ? (
      <CircularProgress />
    ) : (
      <Questionaire />
    )}
  </Fade>
);

const renderScores = () => (
  <Fade in={true}>
    <Scores />
  </Fade>
);

const renderError = (error: ErrorObject) => (<Fade in={true}>
  <Alert severity="error">{`An error occured: ${error.error}. Reload the page to try again.`}</Alert>
</Fade>)



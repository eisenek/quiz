import { Box, CircularProgress, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import React from "react";
import { QuestionDTO } from "../data/QuestionDTO";
import { useQuizContext } from "../hooks/useQuizContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1)
  }
}))

export const Questionaire = () => {
  const classes = useStyles();
  const {state, dispatch} = useQuizContext();
  const [processing, setProcessing] = React.useState(false);

  const {questionCollection, answerCollection} = state;

  const currentQuestionIdx = answerCollection.length;
  const currentQuestion = questionCollection[currentQuestionIdx];
  const answers = shuffleAnswers([currentQuestion?.correct_answer, ...currentQuestion?.incorrect_answers]);
  const handleAnswer = (e: {target: {value: string}}) => {
    setProcessing(true);
    const currentQuestion: QuestionDTO = questionCollection[currentQuestionIdx];

    dispatch({type: 'addAnswer', payload: currentQuestion.correct_answer === e.target?.value})
    setProcessing(false);
  }

  return <Box>
    {processing || !currentQuestion ? <CircularProgress></CircularProgress> : (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{currentQuestion?.question}</FormLabel>
        <RadioGroup value={null} onChange={handleAnswer}>
          {answers.map((answer, index) => <FormControlLabel key={`${answer}-${index}`}value={answer} control={<Radio />} label={answer} />)}
        </RadioGroup>
      </FormControl>
    )}
  </Box>
};

const shuffleAnswers = (answers: any[]) => answers.sort( () => .5 - Math.random() );

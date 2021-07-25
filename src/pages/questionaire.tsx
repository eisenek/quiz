import { Box, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from "react";
import { QuestionDTO } from "../data/QuestionDTO";
import { useQuizContext } from "../hooks/useQuizContext";

export const Questionaire = () => {
  const {state, dispatch} = useQuizContext();
  const [processing, setProcessing] = React.useState(false);

  const {questionCollection, answerCollection} = state;

  const currentQuestionIdx = answerCollection.length ? answerCollection.length - 1 : answerCollection.length;
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
      <FormControl component="fieldset">
        <FormLabel component="legend">{currentQuestion?.question}</FormLabel>
        <RadioGroup value={null} onChange={handleAnswer}>
          {answers.map((answer, index) => <FormControlLabel key={`${answer}-${index}`}value={answer} control={<Radio />} label={answer} />)}
        </RadioGroup>
      </FormControl>
    )}
  </Box>
};

const shuffleAnswers = (answers: any[]) => answers.sort( () => .5 - Math.random() );

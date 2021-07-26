import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useQuizContext } from '../hooks/useQuizContext';

export const Scores = () => {
  const {state, dispatch} = useQuizContext();

  return <Box lineHeight="5em">
    <Typography variant="h5">{`Your score is ${state.answerCollection.filter(answer => answer)?.length} / ${state.answerCollection.length}`}</Typography>
    <Button color="primary" variant="contained" onClick={() => dispatch({type: 'reset'})}>Start again</Button>
  </Box>
}

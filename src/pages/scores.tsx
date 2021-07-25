import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useQuizContext } from '../hooks/useQuizContext';

export const Scores = () => {
  const {state} = useQuizContext();

  return <Box>
    <Typography variant="body1">{`Your score is ${state.answerCollection.filter(answer => answer)?.length} / ${state.answerCollection.length}`}</Typography>
    <Button>Start again</Button>
  </Box>
}

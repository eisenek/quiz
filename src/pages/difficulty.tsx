import {
  Box,
  Fade,
  FormControl,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import React from "react";
import { CONFIG_DIFFICULTIES, DifficultyLevel } from "../App";
import { useQuizContext } from "../hooks/useQuizContext";

export const Difficulty: React.FC<{}> = (props) => {
  const { state, dispatch } = useQuizContext();

  return (
    <Fade in={true}>
      <Box>
        <Typography variant="h2">Choose difficulty level</Typography>
        <FormControl>
          <Select
            value={state.difficulty}
            onChange={(e) => dispatch({type: 'setDifficulty', payload: e.target.value as DifficultyLevel})}
          >
            {CONFIG_DIFFICULTIES.map((difficulty, index) => (
              <MenuItem key={`${difficulty}-${index}`} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Fade>
  );
};

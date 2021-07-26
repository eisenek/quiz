import {
  Box, Fade,
  FormControl,
  InputLabel, makeStyles, MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import React from "react";
import { CONFIG_DIFFICULTIES, DifficultyLevel } from "../App";
import { useQuizContext } from "../hooks/useQuizContext";

const useStyles = makeStyles((theme) => ({
  difficultyForm: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

export const Difficulty: React.FC<{}> = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useQuizContext();

  return (
    <Fade in={true}>
      <Box p={2}>
        <Typography variant="h5">Choose a difficulty level</Typography>
        <FormControl variant="outlined" className={classes.difficultyForm}>
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label"
            placeholder="Difficulty"
            value={state.difficulty || ""}
            onChange={(e) =>
              dispatch({
                type: "setDifficulty",
                payload: e.target.value as DifficultyLevel,
              })
            }
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

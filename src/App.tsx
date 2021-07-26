import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { useErrorBoundary } from "use-error-boundary";
import "./App.css";
import { Quiz } from "./components/Quiz.component";
import { QuizContextProvider } from "./hooks/useQuizContext";

export const CONFIG_DIFFICULTIES = ["easy", "medium", "hard"] as const;
export const CONFIG_NO_QUESTIONS = 10;
export type DifficultyLevel = typeof CONFIG_DIFFICULTIES[number] | null;

const useStyles = makeStyles((theme) => ({
  appSpacing: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const { ErrorBoundary } = useErrorBoundary();
  return (
    <div className="App">
      <Container className={classes.appSpacing} maxWidth="lg">
        <QuizContextProvider>
          <ErrorBoundary
            render={() => <Quiz />}
            renderError={(error) => <Quiz error={error} />}
          />
        </QuizContextProvider>
      </Container>
    </div>
  );
}
export default App;

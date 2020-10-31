import React, { Component } from 'react';

import Question from '../components/question.component';
import { loadQuestions } from '../utils/questions.utils';
import HUD from '../components/hud.component';
import SaveScoreForm from '../components/save-score-form.component';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
      done: false,
    };
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();
      this.setState(
        {
          questions,
        },
        () => {
          this.changeQuestion();
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  changeQuestion = (bonus = 0) => {
    const { questions } = this.state;

    if (questions.length === 0) {
      return this.setState(prevState => ({
        done: true,
        score: prevState.score + bonus,
      }));
    }

    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[randomQuestionIndex];
    const remainingQuestions = [...questions];
    remainingQuestions.splice(randomQuestionIndex, 1);

    this.setState(prevState => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: (prevState.score += bonus),
      questionNumber: (prevState.questionNumber += 1),
    }));
  };

  render() {
    const {
      currentQuestion,
      score,
      questionNumber,
      loading,
      done,
    } = this.state;
    return (
      <>
        {loading && !done && <div id="loader"></div>}
        {!loading && !done && currentQuestion && (
          <>
            <HUD score={score} questionNumber={questionNumber} />
            <p>Score: {score}</p>
            <Question
              question={currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}
        {done && (
          <h1>
            <SaveScoreForm score={score} />
          </h1>
        )}
      </>
    );
  }
}

export default Game;

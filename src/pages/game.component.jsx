import React, { Component } from 'react';

import Question from '../components/question.component';
import { loadQuestions } from '../utils/questions.utils';
import HUD from '../components/hud.component';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
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
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = this.state.questions[randomQuestionIndex];
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);

    this.setState(prevState => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: (prevState.score += bonus),
      questionNumber: (prevState.questionNumber += 1),
    }));

    console.log('score: ', this.state.score);
  };

  render() {
    const { currentQuestion, score, questionNumber } = this.state;
    return (
      <>
        {this.state.loading && <div id="loader"></div>}
        {!this.state.loading && this.state.currentQuestion && (
          <>
            <HUD score={score} questionNumber={questionNumber} />
            <p>Score: {this.state.score}</p>
            <Question
              question={currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}
      </>
    );
  }
}

export default Game;

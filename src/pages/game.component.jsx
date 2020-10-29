import React, { Component } from 'react';

import Question from '../components/question.component';
import { loadQuestions } from '../utils/questions.utils';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();
      this.setState({
        questions,
        currentQuestion: questions[0],
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { currentQuestion } = this.state;
    return (
      <>
        {this.state.loading && <div id="loader"></div>}
        {!this.state.loading && this.state.currentQuestion && (
          <Question question={currentQuestion} />
        )}
      </>
    );
  }
}

export default Game;

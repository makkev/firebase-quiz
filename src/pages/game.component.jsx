import React, { Component } from 'react';

import Question from '../components/question.component';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
    };
  }

  async componentDidMount() {
    const url =
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

    try {
      const res = await fetch(url);
      const { results } = await res.json();

      const questions = results.map(loadedQuestion => {
        const formattedQuestion = {
          question: loadedQuestion.question,
          answerChoices: [...loadedQuestion.incorrect_answers],
        };

        formattedQuestion.answer = Math.floor(Math.random() * 4);

        formattedQuestion.answerChoices.splice(
          formattedQuestion.answer,
          0,
          loadedQuestion.correct_answer
        );

        return formattedQuestion;
      });

      this.setState({ questions, currentQuestion: questions[0] });

      console.log('results: ', results);
      console.log('questions: ', questions);
    } catch (err) {
      console.error(err);
    }

    // fetch(url)
    //   .then(res => {
    //     console.log('res: ', res);
    //     return res.json();
    //   })
    //   .then(({ results }) => {
    //     console.log('results: ', results);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  render() {
    const { currentQuestion } = this.state;
    return (
      <>
        {this.state.currentQuestion && <Question question={currentQuestion} />}
      </>
    );
  }
}

export default Game;

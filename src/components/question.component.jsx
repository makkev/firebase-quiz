import React from 'react';

const Question = ({ question }) => {
  return (
    <div>
      <h2>{question.question}</h2>
      {question.answerChoices.map((answerChoice, idx) => (
        <div className="choice-container" key={idx}>
          <p className="choice-prefix">{idx + 1}</p>
          <p className="choice-text">{answerChoice}</p>
        </div>
      ))}
    </div>
  );
};

export default Question;

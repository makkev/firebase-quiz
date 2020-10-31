import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useFirebase } from './firebase/firebase-context';

const SaveScoreForm = ({ score }) => {
  const [username, setUserName] = useState('');
  const firebase = useFirebase();

  console.log('firebase: ', firebase);

  const onUsernameChange = ({ target: { value } }) => {
    setUserName(value);
  };

  const saveHighScore = e => {
    e.preventDefault();
    const record = {
      name: username,
      score,
    };
    console.log(record);
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="cool kid 123"
          value={username}
          onChange={onUsernameChange}
        />
        <button type="submit" className="btn" disabled={!username}>
          Save
        </button>
      </form>
      <Link to="/" className="btn">
        Home
      </Link>
    </div>
  );
};

export default SaveScoreForm;

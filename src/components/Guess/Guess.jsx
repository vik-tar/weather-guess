import React from 'react';
import './Guess.css';

const Guess = (props) => {
  const { city, guess, actual, isCorrect } = props;

  return (
    <div className='guess'>
      <div className='info'>
        <p>City: {city}</p>
        <p>Your Guess: {guess}°C</p>
        <p>Actual Temperature: {actual}°C</p>
      </div>
      <p className={`isCorrect ${isCorrect ? 'success' : 'error'}`}>{isCorrect ? 'Correct!' : 'Wrong!'}</p>
    </div>
  );
};

export default Guess;
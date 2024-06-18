import React, { useState } from 'react';
import {fetchTemperature} from "../../api";
import './Game.css';
import Guess from "../Guess/Guess";

const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];

const Game = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleGuess = async () => {
    const actualTemp = await fetchTemperature(cities[currentCityIndex]);
    const userGuess = parseFloat(guess);
    const isCorrect = Math.abs(userGuess - actualTemp) <= 5;

    setGuesses([...guesses, { city: cities[currentCityIndex], guess: userGuess, actual: actualTemp, isCorrect }]);
    if (isCorrect) {
      setCorrectGuesses(correctGuesses + 1);
    }
    if (currentCityIndex === cities.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentCityIndex(currentCityIndex + 1);
    }
    setGuess('');
  };

  const clearGuess = () => {
    setCurrentCityIndex(0);
    setGuesses([]);
    setCorrectGuesses(0);
    setIsFinished(false);
  }

  return (
    <div className="game">
      {isFinished ? (
        <div>
          {correctGuesses >= 3 ? <h1>You Won!</h1> : <h1>You Lost!</h1>}
          <button onClick={clearGuess}>Try again!</button>
        </div>
      ) : (
        <div>
          <h1>Guess the Temperature in {cities[currentCityIndex]}</h1>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter temperature in Celsius"
          />
          <button onClick={handleGuess}>Submit Guess</button>
        </div>
      )}
      <div className="results">
        {guesses.map((g, index) => (
          <Guess
            key={index}
            city={g.city}
            guess={g.guess}
            actual={g.actual}
            isCorrect={g.isCorrect}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;

import React, { useState } from 'react';
import data from '../components/data.json'; // Import the JSON data

export default function Finance() {
  // State to store user's answers and explanations
  const [userAnswers, setUserAnswers] = useState({});
  const [explanations, setExplanations] = useState({});
  // State to store the selected answer index
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState({});

  // Handle option change
  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswerIndex({
      ...selectedAnswerIndex,
      [questionIndex]: optionIndex,
    });
  };

  // Function to check answers
  const checkAnswer = (questionIndex) => {
    const correctAnswer = data.Finance[questionIndex].correctAnswerIndex;
    const isCorrect = selectedAnswerIndex[questionIndex] === correctAnswer;
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: isCorrect,
    });
    // Set explanation only if the answer is correct
    setExplanations({
      ...explanations,
      [questionIndex]: isCorrect ? "Correct! " + data.Finance[questionIndex].explanation : "Incorrect, try again!",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">Finance Questions</h1>
      <div>
        {data.Finance.map((item, questionIndex) => (
          <div key={questionIndex} className="mb-4 p-2 border-b">
            <h2 className="text-lg font-semibold">{item.question}</h2>
            <div className="mt-2">
              {item.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={optionIndex}
                    onChange={() => handleOptionChange(questionIndex, optionIndex)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => checkAnswer(questionIndex)}
            >
              Check Answer
            </button>
            {/* Show explanation or incorrect message */}
            {userAnswers[questionIndex] !== undefined && (
              <p className={`mt-2 ${userAnswers[questionIndex] ? 'text-green-500' : 'text-red-500'}`}>
                {explanations[questionIndex]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

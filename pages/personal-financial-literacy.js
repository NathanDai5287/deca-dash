import React, { useState } from 'react';
import data from '../data/data.json'; // Import the JSON data

export default function PersonalFinancialLiteracy() {
  const [userAnswers, setUserAnswers] = useState({});
  const [explanations, setExplanations] = useState({});
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState({});

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswerIndex({
      ...selectedAnswerIndex,
      [questionIndex]: optionIndex,
    });
  };

  const checkAnswer = (questionIndex) => {
    const correctAnswer = data['Personal Financial Literacy'][questionIndex].correctAnswerIndex;
    const isCorrect = selectedAnswerIndex[questionIndex] === correctAnswer;
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: isCorrect,
    });
    setExplanations({
      ...explanations,
      [questionIndex]: isCorrect ? data['Personal Financial Literacy'][questionIndex].explanation : "Incorrect, try again!",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">Personal Financial Literacy Questions</h1>
      <div>
        {data['Personal Financial Literacy'].map((item, questionIndex) => (
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
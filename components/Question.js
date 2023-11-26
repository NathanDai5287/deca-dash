import React from 'react';
import { useState } from 'react';

const Question = ({ question, setI }) => {
	const [explanation, setExplanation] = useState('');

	const checkAnswer = (id) => {
		const selectedAnswerIndex = document.querySelector(`input[name="question-${id}"]:checked`).value;
		const bcorrect = selectedAnswerIndex == question.correctAnswerIndex;

		console.log(bcorrect);
		setExplanation(bcorrect ? question.explanation : 'Incorrect, try again!');
	}

	const nextQuestion = (setI) => {
		setI((i) => i + 1);
		setExplanation('');
	}

	return (
		<div key={question.id} className="mb-4 p-2 border-b">
			<h2 className="text-lg font-semibold">{question.question}</h2>
			<div className="mt-2">
				{question.options.map((option, optionIndex) => (
					<label key={optionIndex} className="block">
						<input
							type="radio"
							name={`question-${question.id}`}
							value={optionIndex}
							className="mr-2"
						/>
						{option}
					</label>
				))}
			</div>

			<button
				className="mt-2 mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors" onClick={() => {checkAnswer(question.id)}}>
				Check Answer
			</button>

			{/* show next button if the right answer was checked */}
			{explanation === question.explanation && (
				<button
					className="mt-2 mx-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors" onClick={() => {nextQuestion(setI)}}>
					Next
				</button>
			)}

			{/* show explanation or incorrect message */}
			{explanation !== '' && (
				<p className={`mt-2 ${explanation === question.explanation ? 'text-green-500' : 'text-red-500'}`}>
					{explanation}
				</p>
			)}
		</div>
	)
};

export default Question;

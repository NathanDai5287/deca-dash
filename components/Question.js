import React from 'react';
import { useState } from 'react';

const Question = ({ question, setQuestion, questions, completedQuestions, missedQuestions }) => {
	const [explanation, setExplanation] = useState('');
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);

	const toggleCheckAnswerButton = () => {
		const button = document.getElementById('check-answer-button');

		button.disabled = !button.disabled;

		button.classList.toggle('hover:bg-blue-700');
		button.classList.toggle('bg-gray-500');
	};

	const checkAnswer = (selectedAnswerIndex) => {
		if (selectedAnswerIndex == question.correctAnswerIndex) {
			setExplanation(question.explanation);
			toggleCheckAnswerButton();
		} else {
			setExplanation('Incorrect, try again!');
			missedQuestions.add(question);
		}
	};

	const nextQuestion = (setQuestion) => {
		const getRandomItem = (set) => {
			const items = Array.from(set);
			return items[Math.floor(Math.random() * items.length)];
		};

		const difference = (a, b) => {
			return new Set([...a].filter((x) => !b.has(x)));
		};

		const union = (a, b) => {
			return new Set([...a, ...b]);
		};

		completedQuestions.add(question);

		// get a random question that is (not completed) or is missed
		setQuestion(getRandomItem(union(difference(questions, completedQuestions), missedQuestions)));
		toggleCheckAnswerButton();

		setExplanation('');
	};

	return (
		<div key={question.id} className='mb-4 p-2 border-b'>
			<h2 className='text-lg font-semibold'>{question.question}</h2>
			<div className='mt-2'>
				{question.options.map((option, optionIndex) => (
					<label key={optionIndex} className='block'>
						<input
							type='radio'
							name={`question-${question.id}`}
							value={optionIndex}
							className='mr-2'
							onChange={(e) => {
								setSelectedAnswerIndex(e.target.value);
							}}
						/>
						{option}
					</label>
				))}
			</div>

			<button
				id='check-answer-button'
				className='mt-2 mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors'
				onClick={() => {
					checkAnswer(selectedAnswerIndex);
				}}
			>
				Check Answer
			</button>

			{/* show next button if the right answer was checked */}
			{explanation === question.explanation && (
				<button
					className='mt-2 mx-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
					onClick={() => {
						nextQuestion(setQuestion);
					}}
				>
					Next
				</button>
			)}

			{/* show explanation or incorrect message */}
			{explanation !== '' && (
				<p
					className={`mt-2 ${
						explanation === question.explanation ? 'text-green-500' : 'text-red-500'
					}`}
				>
					{explanation}
				</p>
			)}
		</div>
	);
};

export default Question;

import React from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Question = ({ question, setQuestion, questions, completedQuestions, missedQuestions, reportedQuestions }) => {
	const [explanation, setExplanation] = useState('');

	const toggleCheckAnswerButton = () => {
		const button = document.getElementById('check-answer-button');

		button.disabled = !button.disabled;

		button.classList.toggle('hover:bg-blue-700');
		button.classList.toggle('bg-gray-500');

		const radioButtons = document.getElementsByName(`question-${question.id}`);
		radioButtons.forEach((radioButton) => {
			radioButton.disabled = !radioButton.disabled;
		});
	};

	const checkAnswer = () => {
		const buttons = document.getElementsByName(`question-${question.id}`);
		let selectedAnswerIndex = -1;
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].checked) {
				selectedAnswerIndex = i;
				break;
			}
		}

		if (selectedAnswerIndex === -1) {
			return;
		}

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

	const toggleReportQuestionButton = () => {
		const button = document.getElementById('report-question-button');

		button.classList.toggle('hover:bg-red-700');
		button.classList.toggle('bg-gray-500');
		button.disabled = !button.disabled;

		// checkmark icon TODO
	}

	const reportQuestion = () => {
		reportedQuestions.add(question);
		toggleReportQuestionButton();
	};

	return (
		<div key={question.id} className='m-4 p-2 border-b'>
			<div className='flex flex-row items-center'>
				<h2 className='basis-7/8 text-lg font-semibold'>{question.question}</h2>
				{/* <button
					id='report-question-button'
					className='mx-10 bg-red-500 text-white rounded hover:bg-red-700 transition-colors'
					onClick={() => {
						reportQuestion();
					}}
				>
					<FontAwesomeIcon className='m-4' icon={faExclamationTriangle} />
				</button> */}
			</div>
			<div className='mt-2'>
				{question.options.map((option, optionIndex) => (
					<label key={optionIndex} className='block'>
						<input
							type='radio'
							name={`question-${question.id}`}
							value={optionIndex}
							className='mr-2'
						/>
						{option}
					</label>
				))}
			</div>

			<button
				id='check-answer-button'
				className='mt-2 mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors'
				onClick={() => {
					checkAnswer();
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
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import { db } from '@/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { updateCompletedQuestions, updateMissedQuestions, replaceMissedQuestions } from './DatabaseUtils';

const Question = ({ question, setQuestion, getNextQuestion, userId, category }) => {
	const [attempted, setAttempted] = useState(false);
	const [completed, setCompleted] = useState(false);

	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [missedQuestions, setMissedQuestions] = useState([]);
	const [isBookmarked, setIsBookmarked] = useState(false);

	// get completed and missed questions from firestore
	useEffect(() => {
		const docRef = doc(db, 'users', userId);
		const unsub = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const userData = doc.data();
				const completedQuestions = userData[category]['completedQuestions'];
				const missedQuestions = userData[category]['missedQuestions'];

				setCompletedQuestions(completedQuestions);
				setMissedQuestions(missedQuestions);

				// if current question is in missedQuestions, setIsBookmarked to true
				if (missedQuestions.includes(question.id)) {
					setIsBookmarked(true);
				}
			} else {
				console.log('No such document!');
			}
		});

		return unsub;
	}, [category, userId, question.id]);

	// get bookmarked status from firestore (bookmarkedQuestions == missedQuestions)
	useEffect(() => {
		const docRef = doc(db, 'users', userId);
		const unsub = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const userData = doc.data();
				const bookmarkedQuestions = userData[category]['missedQuestions'];

				if (bookmarkedQuestions.includes(question.id)) {
					setIsBookmarked(true);
				} else {
					setIsBookmarked(false);
				}
			} else {
				console.log('No such document!');
			}
		});

		return unsub;
	});

	const handleCheckAnswer = () => {
		let selectedAnswerIndex = getSelectedAnswerIndex();

		if (selectedAnswerIndex === -1) {
			return;
		}

		if (checkAnswer(question, selectedAnswerIndex)) {
			setAttempted(true);
			setCompleted(true);

			setCompletedQuestions(
				updateCompletedQuestions(question, userId, category, completedQuestions, missedQuestions)
			);
		} else {
			setAttempted(true);
			setCompleted(false);

			if (!missedQuestions.includes(question.id)) {
				setMissedQuestions(
					updateMissedQuestions(question, userId, category, completedQuestions, missedQuestions)
				);
			}
		}
	};

	const getSelectedAnswerIndex = () => {
		const buttons = document.getElementsByName(`question-${question.id}`);
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].checked) {
				return i;
			}
		}

		return -1;
	};

	const checkAnswer = (question, selectedAnswerIndex) => {
		return question.correctAnswerIndex === selectedAnswerIndex;
	};

	const handleNextQuestion = () => {
		setQuestion(getNextQuestion());
		setAttempted(false);
		setCompleted(false);
	};

	const handleBookmarkQuestion = () => {
		let newMissedQuestions;
		if (isBookmarked) {
			newMissedQuestions = missedQuestions.filter(
				(missedQuestionId) => missedQuestionId !== question.id
			);
		} else {
			newMissedQuestions = [...missedQuestions, question.id];
		}

		setMissedQuestions(
			replaceMissedQuestions(question, userId, category, completedQuestions, newMissedQuestions)
		);

		setIsBookmarked(!isBookmarked);
	};

	return (
		<div key={question.id} className='m-4 p-2 border-b'>
			<div className='flex flex-row items-center'>
				<h2 className='basis-7/8 text-lg font-semibold'>{question.question}</h2>
			</div>

			<div className='mt-2'>
				{question.options.map((option, optionIndex) => (
					<label key={optionIndex} className='block'>
						<input
							type='radio'
							name={`question-${question.id}`}
							value={optionIndex}
							className='mr-2'
							disabled={completed}
						/>
						{option}
					</label>
				))}
			</div>

			<div>
				<button
					id='check-answer-button'
					className='mt-2 mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
					onClick={() => {
						handleCheckAnswer();
					}}
				>
					Check Answer
				</button>

				{/* show next button if the right answer was checked */}
				{completed && (
					<button
						className='mt-2 mx-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
						onClick={() => {
							handleNextQuestion();
						}}
					>
						Next
					</button>
				)}

				{/* bookmark button on new line */}
				<button
					id='bookmark-button'
					className={`mt-2 mx-1 pl-3 py-1 pr-3 border rounded ${
						isBookmarked
							? 'border-gray-700 bg-gray-700 text-white'
							: 'border-gray-500 bg-gray-100 text-black'
					} hover:border-gray-400 hover:bg-gray-400 hover:text-white transition-colors ease-out`}
					onClick={() => {
						handleBookmarkQuestion();
					}}
				>
					<FontAwesomeIcon className='mr-2' icon={faBookmark} />
					Bookmark
				</button>
			</div>

			{/* show explanation or incorrect message */}
			{attempted && (
				<p className={`mt-2 ${completed ? 'text-green-500' : 'text-red-500'}`}>
					{completed ? question.explanation : 'Incorrect, try again!'}
				</p>
			)}
		</div>
	);
};

export default Question;

import React, { useEffect } from 'react';
import { useState } from 'react';

import { db } from '@/firebase/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Question = ({ question, setQuestion, questions, category, userId }) => {
	const [explanation, setExplanation] = useState('');

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
			}
		}

		if (selectedAnswerIndex === -1) {
			return;
		}

		if (selectedAnswerIndex == question.correctAnswerIndex) {
			setExplanation(question.explanation);
			toggleCheckAnswerButton();
			updateCompletedQuestions(question);
		} else {
			setExplanation('Incorrect, try again!');
			setIsBookmarked(true);
			updateMissedQuestions(question);
		}
	};

	const updateCompletedQuestions = async (question) => {
		const docRef = doc(db, 'users', userId);
		const payload = {
			[category]: {
				completedQuestions: [...completedQuestions, question.id],
				missedQuestions: missedQuestions,
			},
		};
		setCompletedQuestions([...completedQuestions, question.id]);

		await updateDoc(docRef, payload);
	};

	const updateMissedQuestions = async (question) => {
		if (missedQuestions.includes(question.id)) {
			return;
		}

		const docRef = doc(db, 'users', userId);
		const payload = {
			[category]: {
				completedQuestions: completedQuestions,
				missedQuestions: [...missedQuestions, question.id],
			},
		};
		setMissedQuestions([...missedQuestions, question.id]);

		await updateDoc(docRef, payload);
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

		const randomId = getRandomItem(
			union(
				difference(
					Array.from(questions).map((question) => {
						return question.id;
					}),
					new Set(completedQuestions)
				),
				new Set(missedQuestions)
			)
		);

		const question = Array.from(questions).find((question) => {
			return question.id === randomId;
		});

		setQuestion(question);

		toggleCheckAnswerButton();

		setExplanation('');
	};

	const toggleBookmarkQuestion = () => {
		setIsBookmarked(!isBookmarked);

		const bookmarkButton = document.getElementById('bookmark-button');
		bookmarkButton.classList.toggle('border-gray-700');
		bookmarkButton.classList.toggle('border-gray-500');
		bookmarkButton.classList.toggle('bg-gray-700');
		bookmarkButton.classList.toggle('bg-gray-100');
		bookmarkButton.classList.toggle('text-white');
		bookmarkButton.classList.toggle('text-black');

		const docRef = doc(db, 'users', userId);
		// if bookmarked, add to missedQuestions if not already there
		if (!missedQuestions.includes(question.id)) {
			const payload = {
				[category]: {
					completedQuestions: completedQuestions,
					missedQuestions: [...missedQuestions, question.id],
				},
			};
			setMissedQuestions([...missedQuestions, question.id]);

			updateDoc(docRef, payload);
		} else {
			// if not bookmarked, remove from missedQuestions if there
			const payload = {
				[category]: {
					completedQuestions: completedQuestions,
					missedQuestions: missedQuestions.filter((id) => id !== question.id),
				},
			};
			setMissedQuestions(missedQuestions.filter((id) => id !== question.id));

			updateDoc(docRef, payload);
		}
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
						/>
						{option}
					</label>
				))}
			</div>

			<div>
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
			</div>

			{/* bookmark button on new line */}
			<button
				id='bookmark-button'
				className={
					'absolute top-2 right-1.5 mt-2 mx-1 pl-3 py-1 pr-3 border rounded border-gray-500 hover:border-gray-400 bg-gray-100 text-black hover:bg-gray-400 hover:text-white transition-colors ease-out'
				}
				onClick={toggleBookmarkQuestion}
			>
				Bookmark
				<FontAwesomeIcon className='ml-2' icon={faBookmark} />
			</button>

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

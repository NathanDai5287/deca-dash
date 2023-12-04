import { useState, useEffect } from 'react';
import { React } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import data from '../data/data.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const QuestionList = ({ userId }) => {
	const [allCompletedQuestions, setAllCompletedQuestions] = useState({});
	const [allMissedQuestions, setAllMissedQuestions] = useState({});

	const clusters = [
		'finance',
		'hospitalityTourism',
		'marketing',
		'businessManagementAdministration',
		'personalFinancialLiteracy',
		'entrepreneurship',
	];
	const clusterDataMap = {
		finance: 'Finance',
		hospitalityTourism: 'Hospitality and Tourism',
		marketing: 'Marketing',
		businessManagementAdministration: 'Business Management and Administration',
		personalFinancialLiteracy: 'Personal Financial Literacy',
		entrepreneurship: 'Entrepreneurship',
	};

	useEffect(() => {
		const docRef = doc(db, 'users', userId);
		const unsub = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const userData = doc.data();
				const missed = {};
				const completed = {};
				for (const cluster of clusters) {
					completed[cluster] = userData[cluster]['completedQuestions'];
					missed[cluster] = userData[cluster]['missedQuestions'];
				}
				setAllCompletedQuestions(completed);
				setAllMissedQuestions(missed);
			} else {
				console.log('No such document!');
			}
		});

		return unsub;
	}, []);

	const removeBookmark = (buttonId, cluster, questionId) => {
		console.log('remove bookmark');

		const docRef = doc(db, 'users', userId);
		const payload = {
			[cluster]: {
				completedQuestions: allCompletedQuestions[cluster],
				missedQuestions: allMissedQuestions[cluster].filter((id) => id !== questionId),
			},
		};
		setAllMissedQuestions((prev) => {
			const newMissedQuestions = { ...prev };
			newMissedQuestions[cluster] = newMissedQuestions[cluster].filter((id) => id !== questionId);
			return newMissedQuestions;
		});

		updateDoc(docRef, payload);
	};

	return (
		<div className='container mx-auto p-4 w-4/5'>
			{Object.keys(allMissedQuestions).map((cluster) => (
				<div key={cluster}>
					{allMissedQuestions[cluster].length > 0 && (
						<h1 className='text-3xl font-bold text-center'>{clusterDataMap[cluster]}</h1>
					)}
					{allMissedQuestions[cluster].map((id, i) => {
						const question = data[clusterDataMap[cluster]].find((question) => question.id === id);

						return (
							<div key={id} className='mb-4 p-2 border-b'>
								<button
									id={'bookmark-button-' + i}
									className={
										'absolute right-1.5 mt-2 mx-1 px-3 py-1 pr-3 border rounded border-gray-500 hover:border-red-600 bg-gray-100 text-black hover:bg-red-600 hover:text-white transition-colors ease-in-out'
									}
									onClick={() => {
										removeBookmark('bookmark-button-' + i, cluster, question.id);
									}}
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>

								<h2 className='text-lg font-semibold'>{question.question}</h2>
								<div className='mt-2'>
									{question.options.map((option, optionIndex) => (
										<label
											key={optionIndex}
											className={
												'block ' +
												(optionIndex === question.correctAnswerIndex
													? ' text-green-500 font-bold '
													: '')
											}
										>
											<input
												type='radio'
												name={`question-${question.id}`}
												value={optionIndex}
												className={'mr-2'}
												disabled
												checked={optionIndex === question.correctAnswerIndex}
											/>
											{option}
										</label>
									))}
								</div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default QuestionList;

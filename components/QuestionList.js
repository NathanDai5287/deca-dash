import { useState, useEffect } from 'react';
import { React } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import data from '../data/data.json';

const QuestionList = ({ userId }) => {
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
		console.log(userId);
		const docRef = doc(db, 'users', userId);
		const unsub = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const userData = doc.data();

				// setMissedQuestions(userData[category]['missedQuestions']);

				// get all missed questions from each category
				console.log(userData);
				const missed = {};
				for (const cluster of clusters) {
					missed[cluster] = userData[cluster]['missedQuestions'];
				}
				setAllMissedQuestions(missed);
			} else {
				console.log('No such document!');
			}
		});

		return unsub;
	}, []);

	return (
		<div className='container mx-auto p-4'>
			{Object.keys(allMissedQuestions).map((cluster) => (
				<div key={cluster}>
					{allMissedQuestions[cluster].length > 0 && (
						<h1 className='text-3xl font-bold text-center'>{clusterDataMap[cluster]}</h1>
					)}
					{allMissedQuestions[cluster].map((id) => {
						const question = data[clusterDataMap[cluster]].find((question) => question.id === id);

						return (
							<div key={id} className='mb-4 p-2 border-b'>
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

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
		'finance': 'Finance',
		'hospitalityTourism': 'Hospitality and Tourism',
		'marketing': 'Marketing',
		'businessManagementAdministration': 'Business Management and Administration',
		'personalFinancialLiteracy': 'Personal Financial Literacy',
		'entrepreneurship': 'Entrepreneurship',
	}

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
		<div>
			{Object.keys(allMissedQuestions).map((cluster) => (
				<div key={cluster} className=''>
					<h1>{clusterDataMap[cluster]}</h1>
					{allMissedQuestions[cluster].map((id) => {
						const question = data[clusterDataMap[cluster]].find((question) => question.id === id);

						return (
							<div key={id} className=''>
								<p>{question['question']}</p>
								<p>{question['options'][question['correctAnswerIndex']]}</p>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default QuestionList;

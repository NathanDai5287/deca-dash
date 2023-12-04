import React, { useState } from 'react';
import { useEffect } from 'react';

import data from '../data/data.json';
import Question from '@/components/Question';
import Navigation from '@/components/Navbar';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const PersonalFinancialLiteracy = () => {
	const [questions] = useState(new Set(data['Personal Financial Literacy']));
	const [question, setQuestion] = useState(data['Personal Financial Literacy'][0]);
	const [userId, setUserId] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				console.log('No user signed in');
			}
		});
	}, []);

	useEffect(() => {
		const startI = Math.floor(Math.random() * questions.size);
		setQuestion(data['Personal Financial Literacy'][startI]);
	}, [questions.size]);

	return (
		<>
			<Navigation />
			<div id='container' className='w-4/5'>
				{userId && (
					<Question
						question={question}
						setQuestion={setQuestion}
						questions={questions}
						category='personalFinancialLiteracy'
						userId={userId}
					/>
				)}
			</div>
		</>
	);
};

export default PersonalFinancialLiteracy;

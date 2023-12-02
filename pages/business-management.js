import React, { useState } from 'react';
import { useEffect } from 'react';

import data from '../data/data.json';
import Question from '@/components/Question';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const BusinessManagementAndAdministration = () => {
	const [questions] = useState(new Set(data['Business Management and Administration']));
	const [question, setQuestion] = useState(data['Business Management and Administration'][0]);
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
		setQuestion(data['Business Management and Administration'][startI]);
	}, [questions.size]);

	return (
		<div id='container' className='w-4/5'>
			{userId && (
				<Question
					question={question}
					setQuestion={setQuestion}
					questions={questions}
					category='businessManagementAdministration'
					userId={userId}
				/>
			)}
		</div>
	);
};

export default BusinessManagementAndAdministration;

import React, { useState } from 'react';
import { useEffect } from 'react';

import data from '../data/data.json';
import Question from '@/components/Question';

import { getFirestore } from 'firebase/firestore';

const Finance = () => {
	const [questions] = useState(new Set(data['Finance']));

	const [question, setQuestion] = useState(data['Finance'][0]);

	useEffect(() => {
		const startI = Math.floor(Math.random() * questions.size);
		setQuestion(data['Finance'][startI]);
	}, [questions.size]);

	return (
		<div id='container' className='w-4/5'>
			<Question
				question={question}
				setQuestion={setQuestion}
				questions={questions}
				category='finance'
				userId='PBZCaqq6JNO57rjF9wAGe8xQbut1' // TODO: no hard code
			/>
		</div>
	);
};

export default Finance;

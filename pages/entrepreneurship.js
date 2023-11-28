import React, { useState } from 'react';
import { useEffect } from 'react';

import data from '../data/data.json'; // Import the JSON data
import Question from '@/components/Question';

const Entrepreneurship = () => {
	const [questions] = useState(new Set(data['Entrepreneurship']));
	const [completedQuestions] = useState(new Set());
	const [missedQuestions] = useState(new Set());
	const [reportedQuestions] = useState(new Set());

	const [question, setQuestion] = useState(data['Entrepreneurship'][0]);

	useEffect(() => {
		const startI = Math.floor(Math.random() * questions.size);
		setQuestion(data['Entrepreneurship'][startI]);
	}, [questions.size]);

	return (
		<div id='container' className='w-4/5'>
			<Question
				question={question}
				setQuestion={setQuestion}
				questions={questions}
				completedQuestions={completedQuestions}
				missedQuestions={missedQuestions}
				reportedQuestions={reportedQuestions}
			/>
		</div>
	);
}

export default Entrepreneurship;

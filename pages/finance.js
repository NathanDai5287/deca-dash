import React, { useState } from 'react';
import { useEffect } from 'react';

import data from '../data/data.json'; // Import the JSON data
import Question from '@/components/Question';

export default function Finance() {
	const [questions] = useState(new Set(data.Finance));
	const [completedQuestions] = useState(new Set());
	const [missedQuestions] = useState(new Set());

	const [question, setQuestion] = useState(data.Finance[0]);

  useEffect(() => {
    const startI = Math.floor(Math.random() * questions.size);
    setQuestion(data.Finance[startI]);
  }, [questions.size]);

	return (
		<Question
			question={question}
			setQuestion={setQuestion}
			questions={questions}
			completedQuestions={completedQuestions}
			missedQuestions={missedQuestions}
		/>
	);
}

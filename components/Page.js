import React, { useState } from 'react';
import { useEffect } from 'react';

import data from '../data/data.json';
import Question from '@/components/Question/Question';
import Navigation from '@/components/Navbar';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Page = ({ data_cluster, cluster }) => {
	const [questions] = useState(new Set(data[data_cluster]));
	const [question, setQuestion] = useState(data[data_cluster][0]);
	const [userId, setUserId] = useState();

	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [missedQuestions, setMissedQuestions] = useState([]);

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
		setQuestion(data[data_cluster][startI]);
	}, [questions.size]);

	// useEffect(() => {
	// 	const docRef = doc(db, 'users', userId);
	// 	const unsub = onSnapshot(docRef, (doc) => {
	// 		if (doc.exists()) {
	// 			const userData = doc.data();
	// 			const completedQuestions = userData[category]['completedQuestions'];
	// 			const missedQuestions = userData[category]['missedQuestions'];

	// 			setCompletedQuestions(completedQuestions);
	// 			setMissedQuestions(missedQuestions);

	// 			// if current question is in missedQuestions, setIsBookmarked to true
	// 			if (missedQuestions.includes(question.id)) {
	// 				setIsBookmarked(true);
	// 			}
	// 		} else {
	// 			console.log('No such document!');
	// 		}
	// 	});

	// 	return unsub;
	// }, [userId, question.id]);

	const getNextQuestion = () => {
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

		return question;
	};

	return (
		<>
			<Navigation />
			<div id='container' className='w-4/5'>
				{userId && (
					<Question
						question={question}
						setQuestion={setQuestion}
						getNextQuestion={getNextQuestion}
						category={cluster}
						userId={userId}
					/>
				)}
			</div>
		</>
	);
};

export default Page;

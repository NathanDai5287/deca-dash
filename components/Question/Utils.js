import { db } from '@/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const updateCompletedQuestions = async (question, userId, category, completedQuestions, missedQuestions) => {
	const docRef = doc(db, 'users', userId);
	const payload = {
		[category]: {
			completedQuestions: [...completedQuestions, question.id],
			missedQuestions: missedQuestions,
		},
	};
	await updateDoc(docRef, payload);

	return [...completedQuestions, question.id];
};

const updateMissedQuestions = async (question, userId, category, completedQuestions, missedQuestions) => {
	const docRef = doc(db, 'users', userId);
	const payload = {
		[category]: {
			completedQuestions: completedQuestions,
			missedQuestions: [...missedQuestions, question.id],
		},
	};
	await updateDoc(docRef, payload);

	return [...missedQuestions, question.id];
};

export { updateCompletedQuestions, updateMissedQuestions };

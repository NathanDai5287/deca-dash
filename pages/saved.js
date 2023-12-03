import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import QuestionList from '@/components/QuestionList';

const Profile = () => {
	const [missedQuestions, setMissedQuestions] = useState([]);
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

	return (
		<div>
			{userId && (
				<QuestionList
					userId={userId}
				/>
			)}
		</div>
	);
};

export default Profile;

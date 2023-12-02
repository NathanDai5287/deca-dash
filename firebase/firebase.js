import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAmU2bGMHOrv4OPUphkjwJwKMKTXAReV-s',
	authDomain: 'deca-dash.firebaseapp.com',
	projectId: 'deca-dash',
	storageBucket: 'deca-dash.appspot.com',
	messagingSenderId: '469040583347',
	appId: '1:469040583347:web:470294aa236fcd4957d6c6',
	measurementId: 'G-WS8ZFNED11',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	const result = await signInWithPopup(auth, provider);

	const user = result.user;
	const db = getFirestore();
	const docRef = doc(db, 'users', user.uid);

	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		await setDoc(docRef, {
			email: user.email,

			finance: {
				completedQuestions: [],
				missedQuestions: [],
			},
			hospitalityTourism: {
				completedQuestions: [],
				missedQuestions: [],
			},
			marketing: {
				completedQuestions: [],
				missedQuestions: [],
			},
			businessManagementAdministration: {
				completedQuestions: [],
				missedQuestions: [],
			},
			personalFinancialLiteracy: {
				completedQuestions: [],
				missedQuestions: [],
			},
			entrepreneurship: {
				completedQuestions: [],
				missedQuestions: [],
			},
		});
	}
};

export { signInWithGoogle, auth, db };

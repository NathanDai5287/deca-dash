import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

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
			// license: '',

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

onAuthStateChanged(auth, async (user) => {
	// const router = useRouter();

	const allowedDomains = ['sduhsd.net', 'berkeley.edu']; // Replace with your allowed domains
	const allowedSpecificUsers = ['nathandai2000@gmail.com']; // Replace with specific allowed email addresses

	if (user) {
		// Get the email domain of the signed-in user
		const emailDomain = user.email.split('@')[1];
		const userEmail = user.email;

		// Check if the email domain is allowed or if the user is specifically allowed
		const isAllowedDomain = allowedDomains.includes(emailDomain);
		const isAllowedSpecificUser = allowedSpecificUsers.includes(userEmail);

		// If neither the domain is allowed nor the specific user is allowed, sign out the user
		if (!isAllowedDomain && !isAllowedSpecificUser) {
			await auth.signOut();
			window.location.href = '/unauthorized';
			return;
		}
	}
});

export { signInWithGoogle, auth, db };

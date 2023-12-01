import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			const db = getFirestore();
			const docRef = doc(db, 'users', user.uid);

			return setDoc(docRef, {
				email: user.email,
			});
		})
		.then(() => {
			console.log('Document successfully written!');
		})
		.catch((error) => {
			console.error('Error writing document: ', error);
		});
};

export { signInWithGoogle, auth, db };

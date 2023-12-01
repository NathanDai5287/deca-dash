import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import Main from '../components/Main';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from "react-firebase-hooks/firestore";

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
	//   { name: "Finance", href: "#", current: false },
	//   { name: "Marketing", href: "#", current: false },
	//   { name: "Business Management & Administration", href: "#", current: false },
	//   { name: "Hospitality & Tourism", href: "#", current: false },
];

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

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Home() {
	const [user] = useAuthState(auth);

	return (
		<div>
			<Head>
				<title>DECA Dashboard</title>
				<meta name='description' content='Supercharge Your DECA Studying!' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{user ? <Dashboard /> : <SignIn />}
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				const db = getFirestore();
				const docRef = doc(db, 'users', user.uid);

				return setDoc(docRef, {
					email: user.email,
          completedQuestions: [],
          missedQuestions: [],
				});
			})
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	return (
		<div className='relative bg-white overflow-hidden h-screen	'>
			<div className='max-w-7xl mx-auto'>
				<div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-lg lg:w-full lg:pb-28 xl:pb-32'>
					<main className='mt-10 mx-auto max-w-7xl lg:pt-40 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
						<div className='sm:text-center lg:text-left'>
							<h1 className='text-4xl tracking-tight font-extrabold text-blue-500 sm:text-5xl md:text-6xl'>
								<span className='block xl:inline'>Deca Dashboard</span>{' '}
							</h1>
							<p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
								DECA Dashboard offers curated MCQs and case studies across all DECA clusters,
								providing a focused platform for students to hone their competitive edge and
								business acumen.
							</p>
							<div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
								<div className='rounded-md mt-5 shadow'>
									<a
										href='#'
										onClick={signInWithGoogle}
										className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10'
									>
										<FaGoogle className='mr-2 ' />
										Sign in with Google
									</a>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			<div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
				<img
					className='h-full w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
					src='https://assets-global.website-files.com/635c470cc81318fc3e9c1e0e/6480c8e19218fd55a752cdd6_compete_hs_header.webp'
					alt=''
				/>
			</div>
		</div>
	);
}

function Dashboard() {
	var photo = auth.currentUser.photoURL;
	// var newphoto = photo.replace("s96-c", "s100-c");
	return (
		<div>
			<Disclosure as='nav' className=''>
				{({ open }) => (
					<>
						<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
							<div className='relative flex h-16 items-center justify-between'>
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									{/* Mobile menu button*/}
									<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='absolute -inset-0.5' />
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
										) : (
											<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>
								<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
									<div className='flex flex-shrink-0 items-center'>
										<Image
											className='h-8 w-auto'
											src='/DECA-Diamond-1.png'
											alt='Your Company'
											width={500}
											height={500}
										/>
										<span className='text-blue-500 font-semibold rounded-md px-3 py-2 text-base'>
											DECA Dashboard
										</span>
									</div>
									<div className='hidden sm:ml-6 sm:block'>
										<div className='flex space-x-4'>
											{navigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														'text-gray-500 ',
														'rounded-md px-3 py-2 text-base font-medium'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</a>
											))}
										</div>
									</div>
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
									<button
										type='button'
										className='rounded-md bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-400 hover:to-sky-300  px-3.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
										onClick={() => signOut(auth)}
									>
										Sign Out
									</button>
								</div>
							</div>
						</div>

						<Disclosure.Panel className='sm:hidden'>
							<div className='space-y-1 px-2 pb-3 pt-2'>
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as='a'
										href={item.href}
										className={classNames(
											'text-gray-500',
											'block rounded-md px-3 py-2 text-base font-medium'
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<div>
				<section className='bg-blend-darken bg-cover bg-blue-500'>
					<div className='py-8 px-2 mx-auto max-w-7xl lg:py-16 lg:px-8'>
						<div className=''>
							<h1 className='text-6xl font-bold text-white'>
								Welcome, {auth.currentUser.displayName.split(' ')[0]}
							</h1>
							<h3 className='text-2xl mt-4 font-bold text-white'>
								Choose an event below to get started...
							</h3>
						</div>
					</div>
				</section>
			</div>

			<Main />
		</div>
	);
}

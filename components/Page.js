import { useState, useEffect } from 'react';
import Image from 'next/image';

import data from '../data/data.json';
import Question from '@/components/Question/Question';
import Navigation from '@/components/Navbar';

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Page = ({ data_cluster, cluster }) => {
	const [questions] = useState(new Set(data[data_cluster]));
	const [question, setQuestion] = useState(data[data_cluster][0]);
	const [userId, setUserId] = useState();

	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [missedQuestions, setMissedQuestions] = useState([]);

	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
		<div className='flex flex-row-reverse h-screen'>
			<Sidebar className='h-full bg-blue-50' collapsed={sidebarCollapsed}>
				<button
					class='bg-blue-100 hover:bg-blue-200 text-black font-semibold p-3 m-2 mb-0 rounded-2xl inline-flex items-center ease-out duration-100'
					onClick={() => {
						setSidebarCollapsed(!sidebarCollapsed);
					}}
				>
					<Image
						src='https://raw.githubusercontent.com/eliyantosarage/font-awesome-pro/7bd749a561c9759b66ee5189c4d48877caf00e92/fontawesome-pro-6.5.1-web/svgs/regular/sidebar-flip.svg'
						className={'fill-current w-8' + (!sidebarCollapsed ? ' mr-2' : '')}
						width={1}
						height={1}
						alt='collapse-sidebar-icon'
					/>
					{!sidebarCollapsed ? 'Collapse' : ''}
				</button>

				<Menu>
					<h5 className='text-center bg-green-100 mx-1 my-2 p-3 text-gray-900 rounded-2xl font-semibold text-2xl'>
						{!sidebarCollapsed ? (
							'Question History'
						) : (
							<Image
								src='https://raw.githubusercontent.com/eliyantosarage/font-awesome-pro/7bd749a561c9759b66ee5189c4d48877caf00e92/fontawesome-pro-6.5.1-web/svgs/solid/clock-rotate-left.svg'
								className='fill-current w-8'
								width={1}
								height={1}
								alt='question-history-icon'
							/>
						)}
					</h5>
					<MenuItem> Pie charts </MenuItem>
					<MenuItem> Line charts </MenuItem>
					<MenuItem> Documentation </MenuItem>
					<MenuItem> Calendar </MenuItem>
				</Menu>
			</Sidebar>

			<div className='flex-1'>
				<Navigation />
				<div id='container' className='mx-auto sm:w-full md:w-1/2'>
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
			</div>
		</div>
	);
};

export default Page;

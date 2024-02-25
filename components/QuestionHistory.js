import { useState, useEffect } from 'react';

import Image from 'next/image';

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { db } from '@/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const QuestionHistory = ({ userId, category, questions, setQuestion }) => {
	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [missedQuestions, setMissedQuestions] = useState([]);

	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	useEffect(() => {
		const docRef = doc(db, 'users', userId);
		const unsub = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const userData = doc.data();
				const completedQuestions = userData[category]['completedQuestions'];
				const missedQuestions = userData[category]['missedQuestions'];

				setCompletedQuestions(completedQuestions);
				setMissedQuestions(missedQuestions);
			} else {
				console.log('No such document!');
			}
		});

		return unsub;
	}, [category, userId]);

	return (
		<Sidebar className='h-full bg-blue-50' collapsed={sidebarCollapsed} width='420px'>
			<div className='flex justify-end'>
				<button
					className='bg-blue-100 hover:bg-blue-200 text-black text-xl font-semibold p-3 m-2 mb-0 rounded-2xl inline-flex items-center ease-out duration-100'
					onClick={() => {
						setSidebarCollapsed(!sidebarCollapsed);
					}}
				>
					<Image
						src='https://raw.githubusercontent.com/eliyantosarage/font-awesome-pro/7bd749a561c9759b66ee5189c4d48877caf00e92/fontawesome-pro-6.5.1-web/svgs/regular/sidebar-flip.svg'
						className={'fill-current w-8' + (!sidebarCollapsed ? ' mr-2' : '')}
						// className='fill-current w-8'
						width={1}
						height={1}
						alt='collapse-sidebar-icon'
					/>
					{!sidebarCollapsed ? 'Collapse' : ''}
				</button>
			</div>

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

				{[...completedQuestions].reverse().map((questionId) => {
					const question = Array.from(questions).find((question) => {
						return question.id === questionId;
					});

					return (
						<MenuItem
							key={questionId}
							className='border-2 rounded m-1 border-gray-200'
							onClick={() => {
								setQuestion(question);
							}}
						>
							{question.question}
						</MenuItem>
					);
				})}
			</Menu>
		</Sidebar>
	);
};

export default QuestionHistory;

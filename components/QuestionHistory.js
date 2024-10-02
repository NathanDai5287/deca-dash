import { useState, useEffect } from 'react';

import Image from 'next/image';

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { db } from '@/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const QuestionHistory = ({ userId, category, questions, setQuestion }) => {
	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [missedQuestions, setMissedQuestions] = useState([]);

	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [sidebarExpanded, setSidebarExpanded] = useState(false);

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

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key === '/') {
				setSidebarCollapsed((sidebarCollapsed) => !sidebarCollapsed);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<Sidebar
			className='h-full bg-blue-50 pt-2'
			collapsed={sidebarCollapsed}
			width={sidebarExpanded ? '50vw' : '15vw'}
		>
			<div className='flex justify-end'>
				{!sidebarCollapsed && (
					<button
						className='bg-blue-100 hover:bg-blue-200 text-black text-xl font-semibold p-3 m-2 mb-0 rounded-2xl inline-flex items-center ease-out duration-100 border-2 border-blue-300'
						onClick={() => {
							setSidebarExpanded(!sidebarExpanded);
						}}
					>
						<Image
							src={
								sidebarExpanded
									? 'https://www.svgrepo.com/show/533661/chevron-right.svg'
									: 'https://www.svgrepo.com/show/533659/chevron-left.svg'
							}
							className='fill-current w-8'
							width={1}
							height={1}
							alt='collapse-sidebar-icon'
						/>
					</button>
				)}
				<button
					className='bg-blue-100 hover:bg-blue-200 text-black text-xl font-semibold p-2 m-2 mb-0 w-64 rounded-2xl inline-flex items-center ease-out duration-100 border-2 border-blue-300'
					onClick={() => {
						setSidebarCollapsed(!sidebarCollapsed);
					}}
				>
					<Image
						src={
							sidebarCollapsed
								? 'https://www.svgrepo.com/show/509895/double-left-chevron.svg'
								: 'https://www.svgrepo.com/show/533660/chevron-right-double.svg'
						}
						className={'fill-current w-8' + (!sidebarCollapsed ? ' mr-2' : '')}
						width={1}
						height={1}
						alt='collapse-sidebar-icon'
					/>
					{!sidebarCollapsed ? 'Collapse (Ctrl+/)' : ''}
				</button>
			</div>

			<Menu>
				<h5 className='text-center bg-green-100 mx-1 my-2 p-3 text-gray-900 rounded-2xl font-semibold text-2xl border-2 border-green-300'>
					Question History
				</h5>

				{[...completedQuestions].reverse().map((questionId) => {
					const question = Array.from(questions).find((question) => {
						return question.id === questionId;
					});

					return (
						<MenuItem
							key={questionId}
							className='border-2 rounded m-1 border-gray-200 flex items-center'
							onClick={() => {
								setQuestion(question);
							}}
						>
							{missedQuestions.includes(questionId) && '❌'}&ensp;
							{question.question}
						</MenuItem>
					);
				})}
			</Menu>
		</Sidebar>
	);
};

export default QuestionHistory;

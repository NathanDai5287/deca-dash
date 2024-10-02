import { useRouter } from 'next/router';

const Unauthorized = () => {
	const router = useRouter();

	// Function to handle redirect to home or login page
	const handleRedirect = () => {
		router.push('/'); // Redirect to the home page or change to '/login' if needed
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold text-red-600 mb-4'>Unauthorized</h1>
			<p className='text-lg text-gray-700 mb-6'>You are not authorized to view this page.</p>
			<button
				onClick={handleRedirect}
				className='px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-6'
			>
				Go Back
			</button>
			<p className='text-md text-gray-600'>
				Please contact{' '}
				<a href='mailto:nathan.dai@berkeley.edu' className='text-blue-500 underline'>
					nathan.dai@berkeley.edu
				</a>{' '}
				for inquiries about purchasing a school license or an individual license.
			</p>
		</div>
	);
};

export default Unauthorized;

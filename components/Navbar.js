import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';

const Navigation = () => {
	return (
		<Navbar expand='lg' className='bg-body-secondary' bg='primary'>
			<Container>
				<Navbar.Brand href='/'>
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
				</Navbar.Brand>
				<Nav className='me-auto'>
					<NavDropdown
						className='mr-2 p-1 border-blue-400 hover:bg-blue-100 hover:border-blue-500 border-2 rounded transition-colors ease-out'
						title='Clusters'
						id='cluster-dropdown'
					>
						<NavDropdown.Item href='/finance'>Finance</NavDropdown.Item>
						<NavDropdown.Item href='/hospitality'>Hospitality and Tourism</NavDropdown.Item>
						<NavDropdown.Item href='/marketing'>Marketing</NavDropdown.Item>
						<NavDropdown.Item href='/business-management'>
							Business Management and Administration
						</NavDropdown.Item>
						<NavDropdown.Item href='/personal-financial-literacy'>
							Personal Financial Literacy
						</NavDropdown.Item>
						<NavDropdown.Item href='/entrepreneurship'>Entrepreneurship</NavDropdown.Item>
					</NavDropdown>
					<div className='p-1 h-14 border-green-400 hover:bg-green-100 hover:border-green-500 border-2 rounded transition-colors ease-out'>
						<Nav.Link id='saved' href='/saved'>
							Bookmarked Questions
						</Nav.Link>
					</div>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Navigation;

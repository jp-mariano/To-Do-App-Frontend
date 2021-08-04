import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { Nav, Navbar } from 'react-bootstrap';
import AppHelper from '../helpers/app-helper';

function NavBar() {
	const [token, setToken] = useState();
	
	useEffect(() => {
		setToken(AppHelper.getAccessToken());
	});
	
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			{ token ?
				<Navbar.Brand href='/dashboard' id='jpm-logo'>
					<Image
						src='/jpm-logo-white.png'
						height='30'
						width='30'
						className='d-inline-block align-top'
						alt='JP Logo'
					/>
				</Navbar.Brand>
				:
				<Navbar.Brand href='/' id='jpm-logo'>
					<Image
						src='/jpm-logo-white.png'
						height='30'
						width='30'
						className='d-inline-block align-top'
						alt='JP Logo'
					/>
				</Navbar.Brand>
			}
			
			<Navbar.Toggle aria-controls='responsive-navbar-nav' className='me-3' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				{ token ?
					<Nav className='ms-auto'>
						<Nav.Link href='/dashboard' className='ms-2'>Dashboard</Nav.Link>
						<Nav.Link href='/logout' className='ms-2 me-2'>Log Out</Nav.Link>
					</Nav>
					:
					<Nav className='ms-auto'>
						<Nav.Link href='/register' className='ms-2'>Register</Nav.Link>
						<Nav.Link href='/login' className='ms-2 me-2'>Log In</Nav.Link>
					</Nav>
				}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
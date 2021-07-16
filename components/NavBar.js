import { Fragment, useEffect, useState } from 'react';
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
				<Navbar.Brand href='/dashboard'>
					<img
						src='/jpm-logo-white.png'
						height='30'
						width='30'
						className='d-inline-block align-top'
						alt='JP Logo'
					/>
				</Navbar.Brand>
				:
				<Navbar.Brand href='#'>
					<img
						src='/jpm-logo-white.png'
						height='30'
						width='30'
						className='d-inline-block align-top'
						alt='JP Logo'
					/>
				</Navbar.Brand>
			}
			
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				{ token ?
					<Fragment>
						<Nav className='me-auto'>
							<Nav.Link href='/dashboard'>Dashboard</Nav.Link>
							<Nav.Link href='#'>My Details</Nav.Link>
						</Nav>
						
						<Nav>
							<Nav.Link href='/logout'>Log Out</Nav.Link>
						</Nav>
					</Fragment>
					:
					<Fragment>
						<Nav className='me-auto'>
							<Nav.Link></Nav.Link>
						</Nav>
						
						<Nav>
							<Nav.Link href='#'>Register</Nav.Link>
							<Nav.Link href='/login'>Log In</Nav.Link>
						</Nav>
					</Fragment>
				}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
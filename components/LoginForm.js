import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { UserContext } from '../UserContext';
import AppHelper from '../helpers/app-helper';
import { Button, Form } from 'react-bootstrap';

function LoginForm() {
	const router = useRouter();
	
	const { setUser } = useContext(UserContext);
	
	// useStates
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);
	
	// Effect
	useEffect(() => {
		if (email !== '' && password !== '') {
			setIsActive(true);
		}
	}, [email, password]);
	
	// Authentication process
	async function authenticateEmail(e) {
		try {
			e.preventDefault();
			
			// Log In via Email
			// Assign an access token to the user when log in is successful
			const response = await fetch(`${ AppHelper.API_URL }/users/log-in`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password
				})
			});
			
			const data = await response.json();
			
			if (typeof data.accessToken !== 'undefined') {
				getUserDetails(data.accessToken);
				
				// Clears the form fields when finished
				setEmail('');
				setPassword('');
			} else {
				if (data.error === 'email-does-not-exist') {
					Swal.fire('Authentication Failed', 'User does not exist.', 'error');
				} else if (data.error === 'incorrect-password') {
					Swal.fire('Authentication Failed', 'Please check your password.', 'error');
				} else if (data.error === 'login-type-error') {
					Swal.fire('Login Type Error', 'You may have registered through a different login method, try an alternative login method', 'error');
				}
			}
			
		} catch (err) {
			console.error(err);
		}
	}
	
	// Fetching user's information upon login and save the id to UserContext
	async function getUserDetails(accessToken) {
		try {
			const response = await fetch(`${ AppHelper.API_URL }/users/details`, {
				headers: { Authorization: `Bearer ${ accessToken }` }
			});
			
			const data = await response.json();
			
			setUser({ token: accessToken });
			localStorage.setItem('token', accessToken);
			
			// Welcome alert
			Swal.fire('Welcome!', `How's your day, ${ data.givenName }?`, 'success');
			
			// router
			router.push('/');
			
		} catch (err) {
			console.error(err);
		}
	}
	
	return (
		<Fragment>
			<h2>Log In</h2>
			<p>
				Don't have an account yet? <a href='/'>Register now</a>
			</p>
			<Form onSubmit={ authenticateEmail }>
				<Form.Group controlId='userEmail'>
					<Form.Control
						type='email'
						placeholder='Email'
						value={ email }
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group controlId='userPassword'>
					<Form.Control
						type='password'
						placeholder='Password'
						value={ password }
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				
				{ isActive ?
					<Button
						className='btn btn-block mb-3'
						variant='primary'
						type='submit'
					>
						Log In
					</Button>
					:
					<Button
						className='btn btn-block mb-3'
						variant='secondary'
						disabled
					>
						Log In
					</Button>
				}
			</Form>
		</Fragment>
	);
}

export default LoginForm;
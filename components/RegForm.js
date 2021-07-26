import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import AppHelper from '../helpers/app-helper';
import { Button, Form } from 'react-bootstrap';

function RegForm() {
	const router = useRouter();
	
	// useStates
	const [givenName, setGivenName] = useState('');
	const [familyName, setFamilyName] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [showPassword, setShowPassword] = useState('password');
	
	// Effects
	useEffect(() => {
		if ((givenName !== '' && familyName !== '' && email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)) {
			setIsActive(true);
		}
	}, [givenName, familyName, email, password1, password2]);
	
	function passwordToggle() {
		if (showPassword === 'password') {
			setShowPassword('text');
		} else {
			setShowPassword('password');
		}
	}
	
	// Registration process
	async function registerUser(e) {
		try {
			e.preventDefault();
			
			// Look if there're duplicate emails in our Database
			const lookForDupeEmails = await fetch(`${ AppHelper.API_URL }/users/email-exists`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email })
			});
			
			const isDuplicate = await lookForDupeEmails.json();
			
			// If none, proceed with registration
			if (!isDuplicate) {
				const proceedToRegister = await fetch(`${ AppHelper.API_URL }/users/register`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						givenName: givenName,
						familyName: familyName,
						email: email,
						password: password1
					})
				});
				
				const data = await proceedToRegister.json();
				
				if (data) {
					// Clear all fields in the form
					setGivenName('');
					setFamilyName('');
					setEmail('');
					setPassword1('');
					setPassword2('');
					
					// Success message
					Swal.fire('Success!', 'Thank you for registering with us.', 'success');
					
					// Redirect to Login page after registering
					router.push('/login');
				}
			} else {
				// Else, alert the user
				Swal.fire({
					icon: 'info',
					title: 'Oops...',
					text: 'User email is already taken. Try a different one.',
					footer: `<a href="/">Go to Login page</a>`
				});
			}			
			
		} catch (err) {
			console.error(err);
		}
	}
	
	return (
		<Fragment>
			<h2>Register</h2>
			<Form onSubmit={ registerUser }>
				<h6>We'll never share your details with anyone else.</h6>
				<Form.Group controlId='userGivenName'>
					<Form.Control
						type='text'
						placeholder='Given Name'
						value={ givenName }
						onChange={(e) => setGivenName(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group controlId='userFamilyName'>
					<Form.Control
						type='text'
						placeholder='Family Name'
						value={ familyName }
						onChange={(e) => setFamilyName(e.target.value)}
						required
					/>
				</Form.Group>
				
				<br />
				
				<h6>Login Credentials</h6>
				<Form.Group controlId='userEmail'>
					<Form.Control
						type='email'
						placeholder='Email'
						value={ email }
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group controlId='userPassword1'>
					<Form.Control
						type={ showPassword }
						placeholder='Password'
						value={ password1 }
						onChange={(e) => setPassword1(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group controlId='userPassword2'>
					<Form.Control
						type={ showPassword }
						placeholder='Verify Password'
						value={ password2 }
						onChange={(e) => setPassword2(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group controlId='passwordToggle'>
					<Form.Check
						type='checkbox'
						label='Show password'
						onClick={ passwordToggle }
					/>
				</Form.Group>
				
				{ isActive ?
					<Button className='mb-3 btn btn-block' variant='primary' type='submit'>
						Submit
					</Button>
					:
					<Button disabled className='mb-3 btn btn-block' variant='secondary'>
						Submit
					</Button>
				}
			</Form>
		</Fragment>
	);
}

export default RegForm;
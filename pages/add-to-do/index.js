import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Head from '../../components/Head';
import AppHelper from '../../helpers/app-helper';
import { Button, Form } from 'react-bootstrap';

function AddToDo() {
	const headData = {
		title: 'Add a To Do',
		description: 'Create your first task today!'
	};
	
	const router = useRouter();
	
	// useStates
	const [token, setToken] = useState();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [isActive, setIsActive] = useState(false);
	
	// Effect
	useEffect(() => {
		if (name !== '' && description !== '' && date !== '') {
			setIsActive(true);
		}
	}, [name, description, date]);
	
	useEffect(() => {
		setToken(AppHelper.getAccessToken());
	});
	
	// To create a new To Do
	async function createToDo(e) {
		try {
			e.preventDefault();			
			
			const response = await fetch(`${ AppHelper.API_URL }/users/add-to-do`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ token }`
				},
				body: JSON.stringify({
					name: name,
					description: description,
					toDoDate: date
				})
			});
			
			const data = await response.json();
			
			if (data) {
				// Clears the form fields when finished
				setName('');
				setDescription('');
				setDate('');
				
				// Success message
				Swal.fire({
					icon: 'success',
					title: 'Yay!',
					text: 'Your To Do has been created.',
					showConfirmButton: false,
					timer: 2468
				});
				
				// router
				router.push('/dashboard');
			}
			
		} catch (err) {
			console.error(err);
		}
	}
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2>Add To Do</h2>
			<Form onSubmit={ createToDo }>
				<Form.Group
					className='mb-3'
					controlId='toDoName'
				>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Name of your To Do'
						value={ name }
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group
					className='mb-3'
					controlId='toDoDescription'
				>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as='textarea'
						placeholder='Description'
						value={ description }
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</Form.Group>
				
				<Form.Group
					className='mb-3'
					controlId='toDoDate'
				>
					<Form.Label>Date</Form.Label>
					<Form.Control
						type='date'
						value={ date }
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</Form.Group>
				
				{ isActive ?
					<Fragment>
						<Button
							className='btn btn-block mb-3'
							variant='primary'
							type='submit'
						>
							Create
						</Button>
						<Button
							className='btn btn-block mb-3'
							variant='dark'
							href='/dashboard'
						>
							Back to Dashboard
						</Button>
					</Fragment>
					:
					<Fragment>
						<Button
							className='btn btn-block mb-3'
							variant='secondary'
							disabled
						>
							Create
						</Button>
						<Button
							className='btn btn-block mb-3'
							variant='dark'
							href='/dashboard'
						>
							Back to Dashboard
						</Button>
					</Fragment>
				}
			</Form>
		</Fragment>
	);
}

export default AddToDo;
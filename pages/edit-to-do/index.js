import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Swal from 'sweetalert2';
import Head from '../../components/Head';
import AppHelper from '../../helpers/app-helper';
import { Button, Form } from 'react-bootstrap';

function EditToDo() {
	const headData = {
		title: 'Edit a To Do',
		description: 'Edit your To Do here.'
	};
	
	const router = useRouter();
	const { query: { id } } = router;
	
	// useStates
	const [token, setToken] = useState();
	const [oldName, setOldName] = useState('');
	const [name, setName] = useState('');
	const [oldDescription, setOldDescription] = useState('');
	const [description, setDescription] = useState('');
	const [oldDate, setOldDate] = useState('');
	const [date, setDate] = useState('');
	const [isActive, setIsActive] = useState(false);
	
	// Effect
	useEffect(() => {
		if (name !== '' || description !== '' || date !== '') {
			setIsActive(true);
		}
	}, [name, description, date]);
	
	useEffect(() => {
		setToken(AppHelper.getAccessToken());
	});
	
	// Fetching the specific To Do's details
	useEffect(() => {
		async function getToDoDetails() {
			try {
				const response = await fetch(`${ AppHelper.API_URL }/users/details`, {
					headers: { Authorization: `Bearer ${ token }` }
				});
				
				const data = await response.json();
							
				data.toDo.forEach(toDo => {
					if (toDo._id === id) {
						setOldName(toDo.name);
						setOldDescription(toDo.description);
						setOldDate(moment(toDo.toDoDate).format('L'));
					}
				});
				
			} catch (err) {
				console.error(err);
			}
		}
		
		getToDoDetails();		
	}, [token, oldName, oldDescription, oldDate]);
	
	// Clear all fields
	function clearFields() {
		setName('');
		setDescription('');
		setDate('');
		setIsActive(false);
	}
	
	// To edit a To Do
	function editToDo() {		
		async function fetchRequest(path, newData) {
			try {
				const response = await fetch(`${ AppHelper.API_URL }/users/edit/${ path }/${ id }`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${ token }`
					},
					body: JSON.stringify(newData)
				});
				
				const success = await response.json();
				
				if (success) {
					// Clears the form fields when finished
					clearFields();
					
					// Success message
					Swal.fire({
						icon: 'success',
						title: 'Yay!',
						text: 'Your To Do has been edited.',
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
		
		// CONTROL STATEMENTS
		// If all three fields are filled up
		if (name !== '' && description !== '' && date !== '') {
			const editedFields = {
				name: name,
				description: description,
				toDoDate: date
			};
			
			fetchRequest('to-do', editedFields);
			
			// Name field is the only one with content
		} else if (name !== '') {
			const editedField = { name: name };
			
			fetchRequest('to-do-name', editedField);
			
			// Description field is the only one with content
		} else if (description !== '') {
			const editedField = { description: description };
			
			fetchRequest('to-do-desc', editedField);
			
			// Date field is the only one with content
		} else if (date !== '') {
			const editedField = { toDoDate: date };
			
			fetchRequest('to-do-date', editedField);
		}
	}
	
	// Confirmation Modal
	async function confirmationModal(e) {
		try {
			e.preventDefault();
			
			const shouldEdit = await Swal.fire({
				title: 'Are you sure?',
				text: 'This will change the details of your To Do.',
				icon: 'info',
				showCancelButton: true,
				confirmButtonColor: '#3fc3ee',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, proceed.'
			});
			
			// If user confirms the message, proceed with the editing process
			if (shouldEdit.isConfirmed) {
				await editToDo();
			}
			
		} catch (err) {
			console.error(err);
		}		
	}
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2 className='mt-3 mb-3'>Edit To Do</h2>
			<Form onSubmit={ confirmationModal }>
				<Form.Group
					className='mb-3'
					conrtolId='toDoName'
				>
					<Form.Text className='text-muted'>
						Old Value: &quot;{ oldName }&quot;
					</Form.Text>
					<Form.Control
						type='text'
						placeholder='New Name*'
						value={ name }
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				
				<Form.Group
					className='mb-4'
					conrtolId='toDoDescription'
				>
					<Form.Text className='text-muted'>
						Old Value: &quot;{ oldDescription }&quot;
					</Form.Text>
					<Form.Control
						as='textarea'
						placeholder='New Description*'
						value={ description }
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
				
				<Form.Group
					className='mb-4'
					controlId='toDoDate'
				>
					<Form.Label>Date*</Form.Label>
					<br />
					<Form.Text className='text-muted'>
						Old Value: &quot;{ oldDate }&quot;
					</Form.Text>
					<Form.Control
						type='date'
						value={ date }
						onChange={(e) => setDate(e.target.value)}
					/>
				</Form.Group>
				
				<h6 className='mb-3'>* Leave the fields blank or in default if you don&apos;t want to change their value.</h6>
				
				{ isActive ?
					<Fragment>
						<Button
							className='me-2 mb-4'
							variant='primary'
							type='submit'
						>
							Save
						</Button>
						
						<Button
							className='me-2 mb-4'
							variant='outline-primary'
							onClick={ clearFields }
						>
							Clear
						</Button>
					</Fragment>
					:
					<Fragment>
						<Button
							className='me-2 mb-4'
							variant='secondary'
							disabled
						>
							Save
						</Button>
						
						<Button
							className='me-2 mb-4'
							variant='outline-primary'
							onClick={ clearFields }
						>
							Clear
						</Button>
					</Fragment>
				}
			</Form>
			<Button
				variant='dark'
				href='/dashboard'
			>
				Back to Dashboard
			</Button>
		</Fragment>
	);
}

export default EditToDo;
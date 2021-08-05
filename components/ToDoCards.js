import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import Swal from 'sweetalert2';
import AppHelper from '../helpers/app-helper';
import { Button, Card, ToggleButton } from 'react-bootstrap';

function ToDoCards({ cardTypeProp } ) {
	const router = useRouter();
	
	// useStates
	const [token, setToken] = useState();
	const [toDoList, setToDoList] = useState([]);
	const [reload, setReload] = useState(false);
	
	useEffect(() => {
		setToken(AppHelper.getAccessToken());
	});
	
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`${ AppHelper.API_URL }/users/details`, {
					headers: { Authorization: `Bearer ${ token }` }
				});
				
				const data = await response.json();
				
				let toDos;
				let sortedToDos;
				
				// Check if user is new, they're new if array length is equal to 0
				if (data.toDo.length > 0) {
					// Check if all to do's are already done
					const allDoneToDo = data.toDo.every(toDo => {
						return toDo.status === 'done';
					});
					
					if (allDoneToDo) {
						// This means that all to do's are already done
						// Give a simple message to the user
						
						// If pending...
						if (cardTypeProp === 'pending') {
							function createNewToDoText() {
								return (
									<h4 className='mt-3'>Wow! Already finished all of that? Create new ones if you want.</h4>
								);
							}
							toDos = createNewToDoText();
							
						} else {
							// If done...
							sortedToDos = data.toDo.sort((a, b) => {
								return moment(a.toDoDate).format('YYYYMMDD') - moment(b.toDoDate).format('YYYYMMDD');
							});
							
							toDos = sortedToDos.map(toDo => {
								return (
									<Card key={ toDo._id } className='mb-3'>
										<Card.Header>
											{ moment(toDo.toDoDate).format('D MMMM YYYY') }
										</Card.Header>
										<Card.Body>
											<Card.Title>{ toDo.name }</Card.Title>
											<Card.Text>{ toDo.description }</Card.Text>
											<Button
												onClick={ () => setToDoStatus(toDo._id, 'pending') }
												variant='info'
												className='me-2'
											>
												Mark as pending
											</Button>
											
											<Button
												onClick={ () => deleteToDo(toDo._id) }
												variant='danger'
											>
												Delete
											</Button>
										</Card.Body>
									</Card>
								);
							});
						}
						
					} else {
						// Render the user's to do list
						sortedToDos = data.toDo.sort((a, b) => {
							return moment(a.toDoDate).format('YYYYMMDD') - moment(b.toDoDate).format('YYYYMMDD');
						});
						
						toDos = sortedToDos.map(toDo => {
							if (toDo.status === 'pending' && cardTypeProp === 'pending') {
								return (
									<Card key={ toDo._id } className='mb-3'>
										<Card.Header>
											{ moment(toDo.toDoDate).format('D MMMM YYYY') }
										</Card.Header>
										<Card.Body>
											<Card.Title>{ toDo.name }</Card.Title>
											<Card.Text>{ toDo.description }</Card.Text>
											<Button
												onClick={ () => setToDoStatus(toDo._id, 'done') }
												variant='info'
												className='me-2'
											>
												Mark as done
											</Button>
											
											<Link
												href={{
													pathname: '/edit-to-do',
													query: { id: toDo._id }
												}}
											>
												<Button variant='warning'>
													Edit
												</Button>
											</Link>
										</Card.Body>
									</Card>
								);
							} else if (toDo.status === 'done' && cardTypeProp === 'done') {
								return (
									<Card key={ toDo._id } className='mb-3'>
										<Card.Header>
											{ moment(toDo.toDoDate).format('D MMMM YYYY') }
										</Card.Header>
										<Card.Body>
											<Card.Title>{ toDo.name }</Card.Title>
											<Card.Text>{ toDo.description }</Card.Text>
											<Button
												onClick={ () => setToDoStatus(toDo._id, 'pending') }
												variant='info'
												className='me-2'
											>
												Mark as pending
											</Button>
											
											<Button
												onClick={ () => deleteToDo(toDo._id) }
												variant='danger'
											>
												Delete
											</Button>
										</Card.Body>
									</Card>
								);
							}
						});
					}
					
				} else {
					// Tell the new user to create a to do
					function createToDoText() {
						return (
							<h4 className='mt-3'>Create your first task today!</h4>
						);
					}
					toDos = createToDoText();
				}
				
				setToDoList(toDos);
				
			} catch (err) {
				console.error(err);
			}
		}
		
		fetchData();
	}, [token, cardTypeProp, reload]);
	
	// Soft reload function
	function softReload() {
		if (!reload) {
			setReload(true);
		} else {
			setReload(false);
		}
	}
	
	// Change status to done
	async function setToDoStatus(id, status) {
		try	{
			const shouldChange = await Swal.fire({
				title: 'Are you sure?',
				icon: 'info',
				showCancelButton: true,
				confirmButtonColor: '#3fc3ee',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, proceed.'
			});
			
			if (shouldChange.isConfirmed) {
				const putRequest = await fetch(`${ AppHelper.API_URL }/users/edit/to-do-status/${ id }`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${ token }`
					},
					body: JSON.stringify({
						status: status
					})
				});
				
				const confirmationMsg = await Swal.fire({
					title: 'Success!',
					icon: 'success',
					showConfirmButton: false,
					timer: 1579
				});
				
				await softReload();
			}
			
		} catch (err) {
			console.error(err);
		}
	}
	
	// Delete a To Do
	async function deleteToDo(id) {
		try {
			const shouldDelete = await Swal.fire({
				title: 'Are you sure?',
				text: 'This action is irreversible.',
				icon: 'info',
				showCancelButton: true,
				confirmButtonColor: '#3fc3ee',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, proceed.'
			});
			
			if (shouldDelete.isConfirmed) {
				const deleteRequest = await fetch(`${ AppHelper.API_URL }/users/delete-to-do/${ id }`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${ token }` }
				});
				
				const confirmationMsg = await Swal.fire({
					title: 'Success!',
					icon: 'success',
					showConfirmButton: false,
					timer: 1579
				});
				
				await softReload();
			}
			
		} catch (err) {
			console.error(err);
		}
	}
	
	return (
		<Fragment>
			{ toDoList }
		</Fragment>
	);
}

export default ToDoCards;
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Swal from 'sweetalert2';
import AppHelper from '../helpers/app-helper';
import { Button, Card } from 'react-bootstrap';

function ToDoCards() {
	const router = useRouter();
	
	// useStates
	const [token, setToken] = useState();
	const [toDoList, setToDoList] = useState([]);
	
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
				
				// Check if user is new, they're new if array length is equal to 0
				if (data.toDo.length > 0) {
					// Check if all to do's are already done
					const allDoneToDo = data.toDo.every(toDo => {
						return toDo.status === 'done';
					});
					
					if (allDoneToDo) {
						// This means that all to do's are already done
						// Give a simple message to the user
						function createNewToDoText() {
							return (
								<h4>Wow! Already finished all of that? Create new ones if you want.</h4>
							);
						}
						toDos = createNewToDoText();
						
					} else {
						// Render the user's to do list
						toDos = data.toDo.map(toDo => {
							if (toDo.status === 'pending') {
								return (
									<Card key={ toDo._id } className='mb-3'>
										<Card.Header>
											{ moment(toDo.toDoDate).format('D MMMM YYYY') }
										</Card.Header>
										<Card.Body>
											<Card.Title>{ toDo.name }</Card.Title>
											<Card.Text>{ toDo.description }</Card.Text>
											<Button
												onClick={ () => setStatusToDone(toDo._id) }
												variant='info'
											>
												Mark as done
											</Button>
											<Button variant='dark'>
												Edit
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
							<h4>Create your first task today!</h4>
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
	}, [token]);
	
	// Change status to done
	async function setStatusToDone(id) {
		try	{
			const shouldChange = await Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			});
			
			if (shouldChange.isConfirmed) {
				const putRequest = await fetch(`${ AppHelper.API_URL }/users/edit/to-do-status/${ id }`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${ token }`
					},
					body: JSON.stringify({
						status: 'done'
					})
				});
				
				const confirmationMsg = await Swal.fire(
					'Deleted',
					'Your file has been deleted.',
					'success'
				);
				
				if (confirmationMsg.isConfirmed) {
					await router.reload();
				}
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
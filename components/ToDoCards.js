import { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import AppHelper from '../helpers/app-helper';
import { Button, Card, Modal } from 'react-bootstrap';

function ToDoCards() {
	const [token, setToken] = useState();
	const [toDoList, setToDoList] = useState([]);
	const [showStatusModal, setShowStatusModal] = useState(false);
	
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
				
				if (data.toDo.length > 0) {
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
										<Button variant='info'>Mark as done</Button>
										<Button variant='dark'>Edit</Button>
									</Card.Body>
								</Card>
							);
						}
					});
					
				} else {
					// Tell the user to create a to do
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
	
	return (
		<Fragment>
			{ toDoList }
		</Fragment>
	);
}

export default ToDoCards;
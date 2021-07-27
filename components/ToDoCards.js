import { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import AppHelper from '../helpers/app-helper';
import { Button, Card } from 'react-bootstrap';

function ToDoCards() {
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
				
				const toDos = data.toDo.map(toDo => {
					if (toDo.status === 'pending') {
						return (
							<Card key={ toDo._id } className='mb-3'>
								<Card.Header>
									{ moment(toDo.toDoDate).format('D MMMM YYYY') }
								</Card.Header>
								<Card.Body>
									<Card.Title>{ toDo.name }</Card.Title>
									<Card.Text>{ toDo.description }</Card.Text>
									<Button variant='warning'>Mark as done</Button>
									<Button variant='danger'>Delete</Button>
								</Card.Body>
							</Card>
						);
					}
				});
				
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
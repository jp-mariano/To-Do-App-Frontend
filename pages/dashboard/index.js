import { Fragment, useState, useEffect } from 'react';
import Head from '../../components/Head';
import ToDoCards from '../../components/ToDoCards';
import AppHelper from '../../helpers/app-helper';
import { Button } from 'react-bootstrap';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	// useState
	const [header, setHeader] = useState("My Pending To Do's");
	const [addToDoVisible, setAddToDoVisible] = useState(true);
	const [buttonLabel, setButtonLabel] = useState("View Done To Do's");
	const [viewCards, setViewCards] = useState('pending');
	
	// Effect
	function viewCardsToggle() {
		if (viewCards === 'pending') {
			setHeader("My Done To Do's");
			setAddToDoVisible(false);
			setButtonLabel("View Pending To Do's");
			setViewCards('done');
		} else {
			setHeader("My Pending To Do's");
			setAddToDoVisible(true);
			setButtonLabel("View Done To Do's");
			setViewCards('pending');
		}
	}
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2 className='mt-3 mb-3'>{ header }</h2>
			{ addToDoVisible ?
				<Button
					className='mb-4 me-2'
					href='/add-to-do'
					variant='primary'
				>
					Add To Do
				</Button>
				:
				null
			}
			<Button
				className='mb-4'
				variant='dark'
				onClick={ viewCardsToggle }
			>
				{ buttonLabel }
			</Button>
			<ToDoCards cardTypeProp={ viewCards } />
		</Fragment>
	);
}

export default Dashboard;
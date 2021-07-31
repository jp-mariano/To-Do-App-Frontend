import { Fragment } from 'react';
import Head from '../../components/Head';
import ToDoCards from '../../components/ToDoCards';
import AppHelper from '../../helpers/app-helper';
import { Button } from 'react-bootstrap';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2>My To Do&apos;s</h2>
			<Button
				className='mb-4'
				href='/add-to-do'
				variant='primary'
			>
				Add To Do
			</Button>
			<ToDoCards />
		</Fragment>
	);
}

export default Dashboard;
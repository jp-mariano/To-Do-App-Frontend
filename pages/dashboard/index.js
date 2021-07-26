import { Fragment } from 'react';
import Head from '../../components/Head';
import ToDoCards from '../../components/ToDoCards';
import AppHelper from '../../helpers/app-helper';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2>My To Do's</h2>
			<ToDoCards />
		</Fragment>
	);
}

export default Dashboard;
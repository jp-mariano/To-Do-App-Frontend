import { Fragment, useContext } from 'react';
import { UserContext } from '../../UserContext';
import Head from '../../components/Head';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	const { user } = useContext(UserContext);
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2>Hello from dashboard</h2>
			<pre>{ user.id }</pre>
			<pre>{ user.token }</pre>
		</Fragment>
	);
}

export default Dashboard;
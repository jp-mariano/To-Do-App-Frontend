import { Fragment, useEffect, useState } from 'react';
import Head from '../../components/Head';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, []);
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2>Hello from dashboard</h2>
			<pre>{ token }</pre>
		</Fragment>
	);
}

export default Dashboard;
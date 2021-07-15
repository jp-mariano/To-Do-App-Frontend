import { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import Head from '../../components/Head';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	const { user } = useContext(UserContext);
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, [user.token]);
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h2>Hello from dashboard</h2>
			<pre>1.{ user.token }</pre>
			<pre>2.{ token }</pre>
		</Fragment>
	);
}

export default Dashboard;
import { Fragment, useEffect, useState } from 'react';
import Head from '../../components/Head';
import AppHelper from '../../helpers/app-helper';

function Dashboard() {
	const headData = {
		title: 'Dashboard',
		description: 'Welcome to your dashboard!'
	};
	
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(AppHelper.getAccessToken());
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
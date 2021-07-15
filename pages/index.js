import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from '../components/Head';
import AppHelper from '../helpers/app-helper';

function Home() {
	const headData = {
		title: 'To Do List Application',
		description: 'Jot down your goals for today!'
	};
	
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(AppHelper.getAccessToken());
	}, []);
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h1>Hello World!</h1>
			<Link href='/dashboard'>
				<a>Dashboard</a>
			</Link>
			<br />
			{ token ?
				<Link href='/logout'>
					<a>Log Out</a>
				</Link>
				:
				<Link href='/login'>
					<a>Log In</a>
				</Link>
			}
			<pre>{ token }</pre>
		</Fragment>
	);
}

export default Home;
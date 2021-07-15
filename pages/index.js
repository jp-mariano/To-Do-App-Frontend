import { Fragment, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../UserContext';
import Head from '../components/Head';

function Home() {
	const headData = {
		title: 'To Do List Application',
		description: 'Jot down your goals for today!'
	};
	
	const { user } = useContext(UserContext);
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, [user.token]);
	
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
			<pre>1.{ user.token }</pre>
			<pre>2.{ token }</pre>
		</Fragment>
	);
}

export default Home;
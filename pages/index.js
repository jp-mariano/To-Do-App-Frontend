import { Fragment, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../UserContext';
import Head from '../components/Head';

function Home() {
	const headData = {
		title: 'To Do List Application',
		description: 'Jot down your goals for today!'
	};
	
	const { user } = useContext(UserContext);
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h1>Hello World!</h1>
			<Link href='/dashboard'>
				<a>Dashboard</a>
			</Link>
			<br />
			{ user.id ?
				<Link href='/logout'>
					<a>Log Out</a>
				</Link>
				:
				<Link href='/login'>
					<a>Log In</a>
				</Link>
			}
			<pre>{ user.id }</pre>
			<pre>{ user.token }</pre>
		</Fragment>
	);
}

export default Home;
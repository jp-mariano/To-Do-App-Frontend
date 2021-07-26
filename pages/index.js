import { Fragment } from 'react';
import Head from '../components/Head';

function Home() {
	const headData = {
		title: 'To Do List Application',
		description: 'Jot down your goals for today!'
	};
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h1>Home Page</h1>
		</Fragment>
	);
}

export default Home;
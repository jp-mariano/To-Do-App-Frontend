import { Fragment } from 'react';
import Head from '../components/Head';
import Footer from '../components/HomePageFooter';

function Home() {
	const headData = {
		title: 'To Do List Application',
		description: 'Jot down your goals for today!'
	};
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<h1>Home Page</h1>
			<Footer />
		</Fragment>
	);
}

export default Home;
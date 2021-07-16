import { Fragment } from 'react';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {	
	return (
		<Fragment>
			<NavBar />
			<Container>
				<Component {...pageProps} />
			</Container>
		</Fragment>
	);
}

export default MyApp;
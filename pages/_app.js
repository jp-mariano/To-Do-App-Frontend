import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {	
	return (
		<Container>
			<Component {...pageProps} />
		</Container>
	);
}

export default MyApp;
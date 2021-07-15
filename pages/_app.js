import { useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Container } from 'react-bootstrap';
import AppHelper from '../helpers/app-helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState({ id: null, token: null });
	
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Container>
				<Component {...pageProps} />
			</Container>
		</UserContext.Provider>
	);
}

export default MyApp;
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../UserContext';

function Logout() {
	const router = useRouter();
	
	const { setUser } = useContext(UserContext);
	
	// Will run at least once just to clear user's credentials
	useEffect(() => {
		setUser({ id: null, token: null });
		router.push('/');
	}, []);
	
	return null;
}

export default Logout;
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../UserContext';

function Logout() {
	const router = useRouter();
	
	const { setUser } = useContext(UserContext);
	
	// Will run at least once just to clear user's credentials
	useEffect(() => {
		setUser({ token: null });
		localStorage.clear();
		router.push('/');
	}, []);
	
	return null;
}

export default Logout;
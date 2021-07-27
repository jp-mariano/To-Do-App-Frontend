import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Logout() {
	const router = useRouter();
	
	// To clear user's credentials
	useEffect(() => {
		localStorage.clear();
		router.push('/');
	});
	
	return null;
}

export default Logout;
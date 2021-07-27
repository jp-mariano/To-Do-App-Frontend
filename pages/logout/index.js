import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

function Logout() {
	const router = useRouter();
	
	// To clear user's credentials
	useEffect(() => {
		async function logOutUser() {
			try {
				localStorage.clear();
				
				Swal.fire({
					icon: 'success',
					title: 'Successfully logged out.',
					showConfirmButton: false,
					timer: 1234
				});
				
				await router.push('/');
				
			} catch (err) {
				console.error(err);
			}
		}
		
		logOutUser();
	});
	
	return null;
}

export default Logout;
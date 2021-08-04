import { useRouter } from 'next/router';

function EditToDo() {
	const router = useRouter();
	const { query: { id } } = router;
	
	return (
		<h2 className='mt-3 mb-3'>Welcome to Edit a To Do - { id }</h2>
	);
}

export default EditToDo;
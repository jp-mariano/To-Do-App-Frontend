import { useRouter } from 'next/router';

function EditToDo() {
	const router = useRouter();
	const { query: { id } } = router;
	
	return (
		<h2>Welcome to Edit a To Do - { id }</h2>
	);
}

export default EditToDo;
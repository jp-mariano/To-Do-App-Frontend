import { Fragment } from 'react';
import Head from '../../components/Head';
import LoginForm from '../../components/LoginForm';
import { Col, Row } from 'react-bootstrap';

function Login() {	
	const headData = {
		title: 'Log In',
		description: 'Log in to view your To Do List.'
	};
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<Row className='justify-content-center'>
				<Col xs md='6'>
					<LoginForm />
				</Col>
			</Row>
		</Fragment>
	);
}

export default Login;
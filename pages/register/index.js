import { Fragment } from 'react';
import Head from '../../components/Head';
import RegForm from '../../components/RegForm';
import { Col, Row } from 'react-bootstrap';

function Register() {
	const headData = {
		title: 'Registration Page',
		description: 'Create an account with us today!'
	};
	
	return (
		<Fragment>
			<Head dataProp={ headData } />
			<Row className='justify-content-center'>
				<Col xs md='6'>
					<RegForm />
				</Col>
			</Row>
		</Fragment>
	);
}

export default Register;
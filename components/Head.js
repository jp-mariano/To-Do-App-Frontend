import Head from 'next/head';
import PropTypes from 'prop-types';

function HeadElem({ dataProp }) {
	const { title, description } = dataProp;
	
	return (
		<Head>
			<meta charSet='UTF-8' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1.0'
			/>
			<title>{ title }</title>
			<meta name='description' content={ description } />
			<link rel='icon' href='/jpm-logo.png' />
		</Head>
	);
}

Head.propTypes = {
	headData: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	})
};

export default HeadElem;
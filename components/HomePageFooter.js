import Image from 'next/image';

function HPFooter() {
	return (
		<div id='footer-container' className='container'>
			<h5 className='text-center'>
				Made with <img src='/pixel-heart.png' height={ 28 } width={ 28 } alt='love' /> by <a href='https://jpmariano.vercel.app/' target='_blank'>Paolo Mariano</a>.
			</h5>
		</div>
	);
}

export default HPFooter;
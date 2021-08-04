import Image from 'next/image';

function HPFooter() {
	return (
		<div id='footer-component'>
			<h5 id='footer-text' className='text-center'>
				Made with <Image id='pixel-heart-img' src='/pixel-heart.png' height={ 19 } width={ 19 } alt='love' /> by <a href='https://jpmariano.vercel.app/' target='_blank' rel='noreferrer'>Paolo Mariano</a>.
			</h5>
		</div>
	);
}

export default HPFooter;
module.exports = {
	API_URL: process.env.NEXT_PUBLIC_API_URL,
	getAccessToken: () => localStorage.getItem('token'),
}
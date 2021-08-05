module.exports = {
	API_URL: process.env.NEXT_PUBLIC_API_URL,
	CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
	getAccessToken: () => localStorage.getItem('token'),
}
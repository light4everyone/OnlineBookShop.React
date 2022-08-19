export const config = {
	API_BASE_PATH: import.meta.env.VITE_API_BASE_PATH,
	AUTH: {
		API_AUDIENCE: import.meta.env.VITE_AUTH_AUDIENCE,
		REDIRECT_URI: import.meta.env.VITE_AUTH_REDIRECT_URI,
		AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
		CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID
	}
}

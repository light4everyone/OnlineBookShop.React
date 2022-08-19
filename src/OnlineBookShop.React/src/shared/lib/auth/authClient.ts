import { Auth0Client } from '@auth0/auth0-spa-js';
import { config } from '../../../shared/config';

export const authClient = new Auth0Client({
	domain: config.AUTH.AUTH_DOMAIN,
	client_id: config.AUTH.CLIENT_ID,
	redirect_uri: config.AUTH.REDIRECT_URI,
	cacheLocation: 'localstorage',
	audience: config.AUTH.API_AUDIENCE,
	useRefreshTokens: true
});


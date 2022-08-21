import { config } from '../config';
import { BooksApi, Configuration, PublishersApi } from './generated';
import { authClient } from '../lib/auth';

const apiConfiguration = new Configuration({
	basePath: config.API_BASE_PATH,
	middleware: [
		{
			async pre(ctx) {
				ctx.init.headers = {
					...ctx.init.headers,
					authorization:
						"Bearer " + await authClient.getTokenSilently()
				};
			},
			async post(ctx) {
				if (ctx.response.status === 401) {
					await authClient.logout();

					throw new Error('Login required');
				}
				return ctx.response;
			},
		}
	]
});

export const booksApi = new BooksApi(apiConfiguration);
export const publishersApi = new PublishersApi(apiConfiguration);

// @typescript:-strictNullChecks
export * from './generated/models';

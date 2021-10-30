import { Suspense } from 'react';
import { Router } from 'react-router';
import { history } from 'shared/lib/history';

export const withRouter = (component: () => React.ReactNode) => () => (
	<Router history={history}>
		<Suspense fallback={<></>}>
			{component()}
		</Suspense>
	</Router>
);

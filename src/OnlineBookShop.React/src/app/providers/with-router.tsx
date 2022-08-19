import { Suspense } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from '../../shared/lib/history';

export const withRouter = (component: () => React.ReactNode) => () => (
	<HistoryRouter history={history}>
		<Suspense fallback={<></>}>
			{component()}
		</Suspense>
	</HistoryRouter>
);

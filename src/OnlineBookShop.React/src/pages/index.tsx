import { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import { userModel } from 'entities/user';
import { Layout } from 'widgets/layout';


const Landing = lazy(() => import('./landing'));
const Books = lazy(() => import('./books'));
const AddBook = lazy(() => import('./books/add-book'));

const Routing = () => {
	const isAuthenticated = userModel.selectors.useIsAuthenticated();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		if (location.pathname === '/' && isAuthenticated) {
			history.push('/books');
		}
	}, [isAuthenticated, location.pathname, history]);

	return (
		<Switch>
			{
				isAuthenticated
					?
					<Layout>
						<Route exact path="/books" component={Books} />
						<Route exact path="/books/add" component={AddBook} />
					</Layout>
					:
					<>
						<Redirect to="/" />
						<Route exact path="/" component={Landing} />
					</>
			}
		</Switch>
	)
}

export default Routing;

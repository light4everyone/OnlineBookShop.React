import { lazy } from 'react';
import { Route } from 'react-router';
import { Navigate, Routes } from 'react-router-dom';
import { userModel } from '../entities/user';
import { Layout } from '../widgets/layout';


const Landing = lazy(() => import('./landing'));
const Books = lazy(() => import('./books'));
const AddBook = lazy(() => import('./books/add-book'));

const Routing = () => {
	const isAuthenticated = userModel.selectors.useIsAuthenticated();

	return (
		<>
			{
				isAuthenticated 
					? 
						<Layout>
							<Routes>
								<Route path='/' element={<Navigate to="/books" />} />
								<Route path="/books" element={<Books />} />
								<Route path="/books/add" element={<AddBook />} />
							</Routes>
						</Layout> 
					: 
						<Routes>
							<Route path='*' element={<Navigate to="/" />} />
							<Route path="/" element={<Landing />} />
						</Routes>
			}
		</>
	)
}

export default Routing;

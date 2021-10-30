import Routing from 'pages';
import { withProviders } from './providers';
import { AppGate } from 'shared/lib/app-gate';
import 'processes/auth';
import { userModel } from 'entities/user';

const App = () => {
	const isLoading = userModel.selectors.useIsLoading();

	return (
		<>
			<AppGate />
			{
				!isLoading && <Routing />
			}
		</>
	)
}

export default withProviders(App);

import { withProviders } from './providers';
import '../processes/auth';
import Routing from '../pages';
import { AppGate } from '../shared/lib/app-gate';
import { userModel } from '../entities/user';

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

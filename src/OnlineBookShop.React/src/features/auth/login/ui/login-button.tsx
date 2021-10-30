import { selectors, events } from '../model/login';
import LoadingButton from '@mui/lab/LoadingButton';

export const LoginButton = () => {
	const loading = selectors.useLoading();

	return (
		<LoadingButton onClick={() => events.loginButtonPressed()} loading={loading} variant="outlined">
			Login
		</LoadingButton>
	)
}

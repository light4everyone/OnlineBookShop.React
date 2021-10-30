import { createEffect, createEvent, forward } from 'effector';
import { authClient } from 'shared/lib/auth';

const logoutButtonPressed = createEvent();

const logoutFx = createEffect(async () => {
	authClient.logout();
});


forward({
	from: logoutButtonPressed,
	to: logoutFx
});

export const events = {
	logoutButtonPressed
}

export const effects = {
	logoutFx
};

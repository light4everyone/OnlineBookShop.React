import { createEffect, createEvent, forward } from 'effector';
import { useStore } from 'effector-react';
import { authClient } from '../../../../shared/lib/auth';

const loginButtonPressed = createEvent();

const loginFx = createEffect(async () => {
	authClient.loginWithRedirect();
});

const $loading = loginFx.pending;

forward({
	from: loginButtonPressed,
	to: loginFx
});

const useLoading = () => {
	return useStore($loading);
}

export const events = {
	loginButtonPressed
}

export const effects = {
	loginFx
};

export const selectors = {
	useLoading
};

import { combine, createEffect, forward, guard, restore, sample } from 'effector';
import { authClient } from '../../../shared/lib/auth';
import { $appMounted } from '../../../shared/lib/app-gate';
import { hasAuthParams } from '../lib';
import { history } from '../../../shared/lib/history';
import { userModel } from '../../../entities/user';
import { User } from '@auth0/auth0-spa-js';

const initAuthFx = createEffect(async () => {
	if (hasAuthParams()) {
		await authClient.handleRedirectCallback();
    
		history.replace({
			search: ''
		});
		
	} else {
		if (await authClient.isAuthenticated()) {
			await authClient.checkSession();
		}
	}
});

const authFailHandlerFx = createEffect(() => {
	history.push('/');
});

const getUserFx = createEffect(async () => {
	const user = await authClient.getUser();
	return user;
});


guard({
	source: $appMounted,
	filter: (mounted) => mounted === true,
	target: initAuthFx,
});

forward({
	from: initAuthFx.done,
	to: getUserFx
});

forward({
	from: [initAuthFx.fail, getUserFx.fail],
	to: authFailHandlerFx
})

forward({
	from: authFailHandlerFx.done,
	to: userModel.events.setIsLoading.prepend(() => false)
})

sample({
	source: guard({
		source: getUserFx.doneData,
		filter: (user) => !!user
	}),
	fn: (user) => user as User,
	target: userModel.events.setUser
});


guard({
	source: combine(
		restore(initAuthFx.doneData.map(() => true), false), 
		restore(getUserFx.doneData.map(() => true), false),
		(initAuthFxDone, getUserFxDone) => initAuthFxDone && getUserFxDone 
	),
	filter: (fetchingDone) => fetchingDone,
	target: userModel.events.setIsLoading.prepend(() => false)
});

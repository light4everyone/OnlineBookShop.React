import { User } from "@auth0/auth0-spa-js";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";


const setUser = createEvent<User>();
const setIsLoading = createEvent<boolean>();

export const $user = createStore<User>({})
	.on(setUser, (_, user) => user);


export const $isLoading = createStore(true)
	.on(setIsLoading, (_, isLoading) => isLoading);


export const $isAuthenticated = $user.map(user => Object.keys(user).length !== 0);


const useUser = () => {
	return useStore($user);
}

const useIsLoading = () => {
	return useStore($isLoading);
}

const useIsAuthenticated = () => {
	return useStore($isAuthenticated);
}

export const events = {
	setUser,
	setIsLoading
};

export const selectors = {
	useUser,
	useIsLoading,
	useIsAuthenticated
};

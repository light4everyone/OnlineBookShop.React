import { createEffect, createStore, createEvent, forward } from 'effector';
import { useStore } from 'effector-react';
import { PublisherDto, publishersApi } from '../../../shared/api';

const getPublishers = createEvent();

const getPublishersFx = createEffect(() => {
	return publishersApi.apiPublishersGet();
});

const $publishers = createStore<PublisherDto[]>([])
	.on(getPublishersFx.doneData, (_, publishers) => publishers);


forward({
	from: getPublishers,
	to: getPublishersFx
});

const usePublishers = () => {
	return useStore($publishers);
}

export const events = {
	getPublishers
}

export const effects = {
	getPublishersFx
}

export const selectors = {
	usePublishers
}

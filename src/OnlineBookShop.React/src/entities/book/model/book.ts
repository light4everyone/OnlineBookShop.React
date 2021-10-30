import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { useStore } from 'effector-react';
import { spread } from 'patronum';
import { BookGridRowDto, booksApi, PagedRequest, BookForUpdateDto } from 'shared/api';
import { history } from 'shared/lib/history';

const clearBooksList = createEvent();

const getBooks = createEvent();

const setPage = createEvent<number>();

const setPageSize = createEvent<number>();

const setColumnForSorting = createEvent<string>();

const setSortDirection = createEvent<'asc' | 'desc'>();

const addBook = createEvent<BookForUpdateDto>();


const $pageIndex = createStore<number>(0)
	.on(setPage, (_, pageIndex) => pageIndex)
	.reset(clearBooksList);

const $pageSize = createStore<number>(5)
	.on(setPageSize, (_, pageSize) => pageSize)
	.reset(clearBooksList);

const $columnForSorting = createStore<string>('title')
	.on(setColumnForSorting, (_, columnForSorting) => columnForSorting)
	.reset(clearBooksList);

const $sortDirection = createStore<'asc' | 'desc'>('asc')
	.on(setSortDirection, (_, sortDirection) => sortDirection)
	.reset(clearBooksList);

const $books = createStore<BookGridRowDto[]>([])
	.reset(clearBooksList);

const $total = createStore<number>(0)
	.reset(clearBooksList);

const getPaginatedBooksFx = createEffect((pagedRequest: PagedRequest) => {
	return booksApi.apiBooksPaginatedSearchPost({ pagedRequest });
});

const addBookFx = createEffect((book: BookForUpdateDto) => {
	return booksApi.apiBooksPost({ bookForUpdateDto: book });
});

const redirectToBooksPageFx = createEffect(() => {
	history.push('/books');
});



forward({
	from: addBook,
	to: addBookFx
});


forward({
	from: addBookFx.doneData,
	to: redirectToBooksPageFx
});


sample({
	source: {pageIndex: $pageIndex, pageSize: $pageSize, sortDirection: $sortDirection, columnNameForSorting: $columnForSorting},
	clock: [getBooks, $pageIndex, $pageSize, $sortDirection, $columnForSorting],
	target: getPaginatedBooksFx
});


spread({
	source: getPaginatedBooksFx.doneData,
	targets: {
		items: $books,
		total: $total
	}
});


const useBooks = () => {
	return useStore($books);
}

const useGetBooksLoading = () => {
	return useStore(getPaginatedBooksFx.pending);
}

const usePageSize = () => {
	return useStore($pageSize);
}

const usePage = () => {
	return useStore($pageIndex);
}

const useTotal = () => {
	return useStore($total);
}

const useColumnForSorting = () => {
	return useStore($columnForSorting);
}

const useSortDirection = () => {
	return useStore($sortDirection);
}

export const events = {
	setPage,
	setPageSize,
	getBooks,
	clearBooksList,
	setSortDirection,
	setColumnForSorting,
	addBook
}

export const effects = {
	getPaginatedBooksFx
}

export const selectors = {
	useBooks,
	useGetBooksLoading,
	usePage,
	usePageSize,
	useTotal,
	useColumnForSorting,
	useSortDirection
}

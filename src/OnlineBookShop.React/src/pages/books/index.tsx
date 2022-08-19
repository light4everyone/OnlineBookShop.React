import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { bookModel } from '../../entities/book';
import { forward } from 'effector';
import { createGate, useGate } from 'effector-react';
import { useMemo } from 'react';

import { Link } from 'react-router-dom';

const pageGate = createGate();

forward({
	from: pageGate.open,
	to: bookModel.events.getBooks
});

forward({
	from: pageGate.close,
	to: bookModel.events.clearBooksList
});

const Books = () => {
	const books = bookModel.selectors.useBooks();
	const page = bookModel.selectors.usePage();
	const pageSize = bookModel.selectors.usePageSize();
	const total = bookModel.selectors.useTotal();
	const loading = bookModel.selectors.useGetBooksLoading();
	const sortDirection = bookModel.selectors.useSortDirection();
	const columnForSorting = bookModel.selectors.useColumnForSorting();

	const priceFormatter = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }), [])

	useGate(pageGate);

	const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
		bookModel.events.setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		bookModel.events.setPageSize(parseInt(event.target.value, 10));
		bookModel.events.setPage(0);
	};

	const handleChangeSort = (column: string) => {
		bookModel.events.setColumnForSorting(column);

		const isAsc = columnForSorting === column && sortDirection === 'asc';
		bookModel.events.setSortDirection(isAsc ? 'desc' : 'asc');

		bookModel.events.setPage(0);
	}

	return (
		<>
			<Button component={Link} to="/books/add" size="medium" variant="contained" color="primary">
				Add book
			</Button>
			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>
								<TableSortLabel
									active={columnForSorting === 'title'}
									direction={sortDirection}
									onClick={() => handleChangeSort('title')}
								>
									Title
								</TableSortLabel>
							</TableCell>
							<TableCell align="right">
								<TableSortLabel
									active={columnForSorting === 'publisher'}
									direction={sortDirection}
									onClick={() => handleChangeSort('publisher')}
								>
									Publisher
								</TableSortLabel>
							</TableCell>
							<TableCell align="right">
								<TableSortLabel
									active={columnForSorting === 'publishedOn'}
									direction={sortDirection}
									onClick={() => handleChangeSort('publishedOn')}
								>
									Published On
								</TableSortLabel>
							</TableCell>
							<TableCell align="right">
								<TableSortLabel
									active={columnForSorting === 'price'}
									direction={sortDirection}
									onClick={() => handleChangeSort('price')}
								>
									Price
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							books.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.title}
									</TableCell>
									<TableCell align="right">{row.publisher}</TableCell>
									<TableCell align="right">
										{
											row.publishedOn!.toLocaleDateString('en-US', {
												year: 'numeric', month: 'long', day: 'numeric'
											})
										}
									</TableCell>
									<TableCell align="right">{priceFormatter.format(row.price!)}</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={total}
				rowsPerPage={pageSize}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>

			{
				loading &&
				<Box sx={{ m: 2 }}>
					<Typography variant="body2">
						Loading...
					</Typography>
				</Box>
			}

		</>
	)
}

export default Books;

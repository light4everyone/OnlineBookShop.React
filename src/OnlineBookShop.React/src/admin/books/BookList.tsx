import React, { useEffect, useMemo, useState } from "react";
import { ColDef, DataGrid, PageChangeParams, SortModelParams } from '@material-ui/data-grid';
import { useSelector } from "react-redux";
import CombinedStore from "../../store/CombinedStore";
import { BookGridRow } from '../../api/books/models/BookGridRow';
import { PagedResult } from '../../lib/grid/PagedResult';
import { getBooksPaged } from '../../api/books';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const BookList = () => {
  const [loading, setLoading] = useState(true);
  const [paginatedBooks, setPaginatedBooks] = useState<PagedResult<BookGridRow>>();
  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const authToken = useSelector<CombinedStore, string>(
    (s) => s.auth.token ?? ''
  );

  const handlePageChange = (params: PageChangeParams) => {
    setPage(params.page - 1);
  };

  const handleSortChange = (params: SortModelParams) => {
    const sortModel = params.sortModel[0];
    if (sortModel) {
      setSortColumn(sortModel.field);
      setSortDirection(`${sortModel.sort}`);
    } else {
      setSortColumn('title');
      setSortDirection('asc');
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const request = await getBooksPaged({
          pageIndex: page,
          pageSize: 5,
          columnNameForSorting: sortColumn,
          sortDirection: sortDirection
        }, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        });
        setPaginatedBooks(request);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();

  }, [authToken, page, sortColumn, sortDirection]);

  const priceFormatter = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }), [])

  const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', hide: true },
    { field: 'title', headerName: 'Title', width: 400, },
    { field: 'publisher', headerName: 'Publisher', width: 200 },
    {
      field: 'publishedOn',
      headerName: 'Published On',
      width: 200,
      type: 'dateTime',
      valueFormatter: ({ value }) =>
        (new Date(`${value}`)).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 200,
      valueFormatter: ({ value }) => priceFormatter.format(Number(value)),
    },

  ];

  return <>
    <Button component={ Link } to="/books/create" size="medium" variant="contained" color="primary">
      Add book
    </Button>
    <div style={{ height: 500, width: '100%', marginTop: 20 }}>
      {
        <DataGrid
          rows={paginatedBooks?.items ?? []}
          columns={columns}
          pagination
          pageSize={paginatedBooks?.pageSize ?? 0}
          rowCount={paginatedBooks?.total ?? 0}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={handleSortChange}
          onPageChange={handlePageChange}
          loading={loading}
        />
      }
    </div>
  </>
};

export default BookList;
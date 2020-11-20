import config from "../../config";
import { PagedResult } from "../../lib/grid/PagedResult";
import { PaginatedRequest } from "../../lib/grid/PaginatedRequest";
import { BookGridRow } from "./models/BookGridRow";
import { Book } from "./models/Book";

const baseUrl = config.API_URL + 'books/';

export const getBooksPaged =
  async (paginatedRequest: PaginatedRequest, requestInit?: RequestInit) => {
    const response = await fetch(baseUrl + 'paginatedSearch/', {
      ...requestInit,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        ...requestInit?.headers
      },
      body: JSON.stringify(paginatedRequest),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data: PagedResult<BookGridRow> = await response.json();
    return data;
  }

export const createBook = 
  async (book: Book, requestInit?: RequestInit) => {
    const response = await fetch(baseUrl, {
      ...requestInit,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        ...requestInit?.headers
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data: Book = await response.json();
    return data;
  }
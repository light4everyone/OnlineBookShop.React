/* tslint:disable */
/* eslint-disable */
/**
 * OnlineBookShop.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BookDto,
  BookForUpdateDto,
  BookListDtoPaginatedResult,
  PagedRequest,
} from '../models';
import {
    BookDtoFromJSON,
    BookDtoToJSON,
    BookForUpdateDtoFromJSON,
    BookForUpdateDtoToJSON,
    BookListDtoPaginatedResultFromJSON,
    BookListDtoPaginatedResultToJSON,
    PagedRequestFromJSON,
    PagedRequestToJSON,
} from '../models';

export interface ApiBooksIdDeleteRequest {
    id: number;
}

export interface ApiBooksIdGetRequest {
    id: number;
}

export interface ApiBooksIdPutRequest {
    id: number;
    bookForUpdateDto?: BookForUpdateDto;
}

export interface ApiBooksPaginatedSearchPostRequest {
    pagedRequest?: PagedRequest;
}

export interface ApiBooksPostRequest {
    bookForUpdateDto?: BookForUpdateDto;
}

/**
 * 
 */
export class BooksApi extends runtime.BaseAPI {

    /**
     */
    async apiBooksIdDeleteRaw(requestParameters: ApiBooksIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiBooksIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/books/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiBooksIdDelete(requestParameters: ApiBooksIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiBooksIdDeleteRaw(requestParameters, initOverrides);
    }

    /**
     */
    async apiBooksIdGetRaw(requestParameters: ApiBooksIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BookDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiBooksIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/books/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BookDtoFromJSON(jsonValue));
    }

    /**
     */
    async apiBooksIdGet(requestParameters: ApiBooksIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BookDto> {
        const response = await this.apiBooksIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiBooksIdPutRaw(requestParameters: ApiBooksIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiBooksIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/books/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BookForUpdateDtoToJSON(requestParameters.bookForUpdateDto),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiBooksIdPut(requestParameters: ApiBooksIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiBooksIdPutRaw(requestParameters, initOverrides);
    }

    /**
     */
    async apiBooksPaginatedSearchPostRaw(requestParameters: ApiBooksPaginatedSearchPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BookListDtoPaginatedResult>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/books/paginated-search`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PagedRequestToJSON(requestParameters.pagedRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BookListDtoPaginatedResultFromJSON(jsonValue));
    }

    /**
     */
    async apiBooksPaginatedSearchPost(requestParameters: ApiBooksPaginatedSearchPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BookListDtoPaginatedResult> {
        const response = await this.apiBooksPaginatedSearchPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiBooksPostRaw(requestParameters: ApiBooksPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/books`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BookForUpdateDtoToJSON(requestParameters.bookForUpdateDto),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiBooksPost(requestParameters: ApiBooksPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiBooksPostRaw(requestParameters, initOverrides);
    }

}

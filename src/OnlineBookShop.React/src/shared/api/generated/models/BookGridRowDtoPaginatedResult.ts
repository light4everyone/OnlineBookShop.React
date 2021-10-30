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

import { exists, mapValues } from '../runtime';
import {
    BookGridRowDto,
    BookGridRowDtoFromJSON,
    BookGridRowDtoFromJSONTyped,
    BookGridRowDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface BookGridRowDtoPaginatedResult
 */
export interface BookGridRowDtoPaginatedResult {
    /**
     * 
     * @type {number}
     * @memberof BookGridRowDtoPaginatedResult
     */
    pageIndex?: number;
    /**
     * 
     * @type {number}
     * @memberof BookGridRowDtoPaginatedResult
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof BookGridRowDtoPaginatedResult
     */
    total?: number;
    /**
     * 
     * @type {Array<BookGridRowDto>}
     * @memberof BookGridRowDtoPaginatedResult
     */
    items?: Array<BookGridRowDto> | null;
}

export function BookGridRowDtoPaginatedResultFromJSON(json: any): BookGridRowDtoPaginatedResult {
    return BookGridRowDtoPaginatedResultFromJSONTyped(json, false);
}

export function BookGridRowDtoPaginatedResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): BookGridRowDtoPaginatedResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pageIndex': !exists(json, 'pageIndex') ? undefined : json['pageIndex'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'total': !exists(json, 'total') ? undefined : json['total'],
        'items': !exists(json, 'items') ? undefined : (json['items'] === null ? null : (json['items'] as Array<any>).map(BookGridRowDtoFromJSON)),
    };
}

export function BookGridRowDtoPaginatedResultToJSON(value?: BookGridRowDtoPaginatedResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pageIndex': value.pageIndex,
        'pageSize': value.pageSize,
        'total': value.total,
        'items': value.items === undefined ? undefined : (value.items === null ? null : (value.items as Array<any>).map(BookGridRowDtoToJSON)),
    };
}



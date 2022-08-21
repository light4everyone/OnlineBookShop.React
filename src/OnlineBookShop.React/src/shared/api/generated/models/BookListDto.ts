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
/**
 * 
 * @export
 * @interface BookListDto
 */
export interface BookListDto {
    /**
     * 
     * @type {number}
     * @memberof BookListDto
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof BookListDto
     */
    title?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookListDto
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof BookListDto
     */
    publishedOn?: Date;
    /**
     * 
     * @type {string}
     * @memberof BookListDto
     */
    publisher?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BookListDto
     */
    price?: number;
}

export function BookListDtoFromJSON(json: any): BookListDto {
    return BookListDtoFromJSONTyped(json, false);
}

export function BookListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BookListDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'publishedOn': !exists(json, 'publishedOn') ? undefined : (new Date(json['publishedOn'])),
        'publisher': !exists(json, 'publisher') ? undefined : json['publisher'],
        'price': !exists(json, 'price') ? undefined : json['price'],
    };
}

export function BookListDtoToJSON(value?: BookListDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'publishedOn': value.publishedOn === undefined ? undefined : (value.publishedOn.toISOString()),
        'publisher': value.publisher,
        'price': value.price,
    };
}


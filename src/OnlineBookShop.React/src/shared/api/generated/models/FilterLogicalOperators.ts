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


/**
 * 
 * @export
 */
export const FilterLogicalOperators = {
    NUMBER_0: 0,
    NUMBER_1: 1
} as const;
export type FilterLogicalOperators = typeof FilterLogicalOperators[keyof typeof FilterLogicalOperators];


export function FilterLogicalOperatorsFromJSON(json: any): FilterLogicalOperators {
    return FilterLogicalOperatorsFromJSONTyped(json, false);
}

export function FilterLogicalOperatorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): FilterLogicalOperators {
    return json as FilterLogicalOperators;
}

export function FilterLogicalOperatorsToJSON(value?: FilterLogicalOperators | null): any {
    return value as any;
}


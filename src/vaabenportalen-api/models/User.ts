/* tslint:disable */
/* eslint-disable */
/**
 * VaabenportalenAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    lastName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    passwordHash?: string | null;
}

/**
 * Check if a given object implements the User interface.
 */
export function instanceOfUser(value: object): value is User {
    return true;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'firstName': json['firstName'] == null ? undefined : json['firstName'],
        'lastName': json['lastName'] == null ? undefined : json['lastName'],
        'email': json['email'] == null ? undefined : json['email'],
        'username': json['username'] == null ? undefined : json['username'],
        'passwordHash': json['passwordHash'] == null ? undefined : json['passwordHash'],
    };
}

export function UserToJSON(json: any): User {
    return UserToJSONTyped(json, false);
}

export function UserToJSONTyped(value?: User | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'firstName': value['firstName'],
        'lastName': value['lastName'],
        'email': value['email'],
        'username': value['username'],
        'passwordHash': value['passwordHash'],
    };
}


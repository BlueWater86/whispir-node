import localVarRequest from 'request';

/* tslint:disable:no-unused-locals */
import { ApiError, ApiErrorWrite } from '../model/apiError';
import { ResponseRule, ResponseRuleWrite } from '../model/responseRule';
import { ResponseRuleCollection, ResponseRuleCollectionWrite } from '../model/responseRuleCollection';
import { ObjectSerializer, Interceptor } from '../model/models';
import { HttpError, RequestFile, ApiResponse, CreateResponse, ApiConfig, RequestOptions } from './apis';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

type ReponseRuleListParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * The number of records to be returned.
    */
    limit?: number;
    /**
    * The record number to start returning from.
    */
    offset?: number;
    /**
    * The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
    */
    sortOrder?: 'asc' | 'desc';
    /**
    * The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
    */
    sortFields?: string;
};

type ResponseRuleCreateParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
} & ResponseRuleWrite;

type ResponseRuleDeleteParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * Response Rule Id
    */
    responseRuleId: string;
};

type ResponseRuleRetrieveParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * Response Rule Id
    */
    responseRuleId: string;
};

type ResponseRuleUpdateParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * Response Rule Id
    */
    responseRuleId: string;
} & ResponseRuleWrite;


export class ResponseRulesApi {
    protected defaultHeaders: any = {};
    protected useQuerystring: boolean = false;
    protected interceptors: Interceptor[] = [];
    protected host: string;

    constructor(config: ApiConfig) {
        this.defaultHeaders = config.defaultHeaders;
        this.host = config.host;
    }

    public addInterceptor(interceptor: Interceptor) {
        this.interceptors.push(interceptor);
    }

    /**
     * Returns a list of response rules.
     * @summary List response rules
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     */
    public async list(
        params?: ReponseRuleListParams,
        options?: RequestOptions): Promise<ApiResponse<ResponseRuleCollection>> {
        const {
            workspaceId,
            limit = 20,
            offset = 0,
            sortOrder,
            sortFields,
        } = params || {};

        const localVarPath = this.host + '/workspaces/{workspaceId}/responserules'
            .replace('{' + 'workspaceId' + '}', encodeURIComponent(String(workspaceId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);

        let localVarFormParams: any = {};
        if (limit !== undefined) {
            localVarQueryParameters['limit'] = ObjectSerializer.serialize(limit, "number");
        }
        if (offset !== undefined) {
            localVarQueryParameters['offset'] = ObjectSerializer.serialize(offset, "number");
        }
        if (sortOrder !== undefined) {
            localVarQueryParameters['sortOrder'] = ObjectSerializer.serialize(sortOrder, "'asc' | 'desc'");
        }
        if (sortFields !== undefined) {
            localVarQueryParameters['sortFields'] = ObjectSerializer.serialize(sortFields, "string");
        }
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.responserule-v1+json';
        (<any>Object).assign(localVarHeaderParams, options?.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this.useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }

            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "ResponseRuleCollection");
                            
                            resolve({ lastResponse: response.toJSON(), ...body });
                        } else {
                            reject(new HttpError(body));
                        }
                    }
                });
            });
        });
    }
    /**
     * ## Response Template Patterns  Each Response Rule has a series of **Patterns** that allow the creator to specify what textual content should be matched in the response SMS or Email, and a number that should be entered when IVR (Voice) is being used.  Each Response Rule can specify as many Response Template Patterns as required.  Each of the Patterns specified will also dynamically create buttons within any Rich Message that is associated with the Response Rule.  This provides an out of the box capability to quickly gather feedback from the field using a Rich User interface, and leveraging SMS as the delivery mechanism. 
     * @summary Create a response rule
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param responseRule 
     */
    public async create(
        params?: ResponseRuleCreateParams,
        options?: RequestOptions): Promise<CreateResponse> {
        const {
            workspaceId,
            ...responseRule
        } = params || {};

        const localVarPath = this.host + '/workspaces/{workspaceId}/responserules'
            .replace('{' + 'workspaceId' + '}', encodeURIComponent(String(workspaceId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);

        let localVarFormParams: any = {};
        localVarHeaderParams['Content-Type'] = 'application/vnd.whispir.responserule-v1+json';
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.responserule-v1+json';
        (<any>Object).assign(localVarHeaderParams, options?.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this.useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(responseRule, "ResponseRule")
        };

        let authenticationPromise = Promise.resolve();

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }

            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            
                            // Special case to extract the resource identifier from the `Location` header.
                            const checkLocation = response?.headers?.location?.match(/\/([^\/]+)\/?$/);
                            let id = (checkLocation && checkLocation[1]) ? checkLocation[1] : undefined;
                            
                            resolve({ lastResponse: response.toJSON(), id, ...body });
                        } else {
                            reject(new HttpError(body));
                        }
                    }
                });
            });
        });
    }
    /**
     * Deletes a Response Rule object.
     * @summary Delete a response rule
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param responseRuleId Response Rule Id
     */
    public async delete(
        params?: ResponseRuleDeleteParams,
        options?: RequestOptions): Promise<ApiResponse> {
        const {
            workspaceId,
            responseRuleId,
        } = params || {};

        const localVarPath = this.host + '/workspaces/{workspaceId}/responserules/{responseRuleId}'
            .replace('{' + 'workspaceId' + '}', encodeURIComponent(String(workspaceId)))
            .replace('{' + 'responseRuleId' + '}', encodeURIComponent(String(responseRuleId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);

        let localVarFormParams: any = {};
        (<any>Object).assign(localVarHeaderParams, options?.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this.useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }

            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            
                            resolve({ lastResponse: response.toJSON(), ...body });
                        } else {
                            reject(new HttpError(body));
                        }
                    }
                });
            });
        });
    }
    /**
     * Retrieves a response rule object.
     * @summary Retrieve a response rule
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param responseRuleId Response Rule Id
     */
    public async retrieve(
        params?: ResponseRuleRetrieveParams,
        options?: RequestOptions): Promise<ApiResponse<ResponseRule>> {
        const {
            workspaceId,
            responseRuleId,
        } = params || {};

        const localVarPath = this.host + '/workspaces/{workspaceId}/responserules/{responseRuleId}'
            .replace('{' + 'workspaceId' + '}', encodeURIComponent(String(workspaceId)))
            .replace('{' + 'responseRuleId' + '}', encodeURIComponent(String(responseRuleId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);

        let localVarFormParams: any = {};
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.responserule-v1+json';
        (<any>Object).assign(localVarHeaderParams, options?.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this.useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }

            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "ResponseRule");
                            
                            resolve({ lastResponse: response.toJSON(), ...body });
                        } else {
                            reject(new HttpError(body));
                        }
                    }
                });
            });
        });
    }
    /**
     * Updates a Response Rule object.
     * @summary Update a response rule
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param responseRuleId Response Rule Id
     * @param responseRule Response Rules object used to update Response Rules
     */
    public async update(
        params?: ResponseRuleUpdateParams,
        options?: RequestOptions): Promise<ApiResponse> {
        const {
            workspaceId,
            responseRuleId,
            ...responseRule
        } = params || {};

        const localVarPath = this.host + '/workspaces/{workspaceId}/responserules/{responseRuleId}'
            .replace('{' + 'workspaceId' + '}', encodeURIComponent(String(workspaceId)))
            .replace('{' + 'responseRuleId' + '}', encodeURIComponent(String(responseRuleId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);

        let localVarFormParams: any = {};
        localVarHeaderParams['Content-Type'] = 'application/vnd.whispir.responserule-v1+json';
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.responserule-v1+json';
        (<any>Object).assign(localVarHeaderParams, options?.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this.useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(responseRule, "ResponseRule")
        };

        let authenticationPromise = Promise.resolve();

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }

            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            
                            resolve({ lastResponse: response.toJSON(), ...body });
                        } else {
                            reject(new HttpError(body));
                        }
                    }
                });
            });
        });
    }
}

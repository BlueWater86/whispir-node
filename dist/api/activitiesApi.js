"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesApi = void 0;
const request_1 = __importDefault(require("request"));
const models_1 = require("../model/models");
const apis_1 = require("./apis");
class ActivitiesApi {
    constructor(config) {
        this.defaultHeaders = {};
        this.useQuerystring = false;
        this.interceptors = [];
        this.defaultHeaders = config.defaultHeaders;
        this.host = config.host;
    }
    addInterceptor(interceptor) {
        this.interceptors.push(interceptor);
    }
    /**
     * Activities are all the individual changes, tasks, calls, messages and so on performed in a given company workspace. Each activity log entry contains information about the workspace, the module (message, email, IVR ...), the user who performed the activity, time stamps, description of the activity, its status (success, fail) and so on.  All of these help meet auditing and standards compliance and also change tracking. For example: * As a Whispir API user (Voice module), you want to be able to update the Whispir activity log as a call progresses through the IVR to ensure that the auditing shows exactly what information a caller heard.  * As a Whispir API user (SMS module), you want to able to retrieve information from the activity log about all the messages sent by a specific user. As activity information is sensitive, stricter permission rules apply to the data served by these endpoints.  * If the user is a *Company Administrator* or *Company Leader*, retrieving the activity will produce a **_200 OK_** with the valid response * If the user is a *Company Member* or *Company Guest*, they will receive instead a **_403 Forbidden_** response advising that they don’t have permission to access this resource * A *Company Administrator* or *Company Leader* can also create content within the activity stream. They do this through a POST of data to either the _/activities_ endpoint or to the specific activity ID * They must specify a valid _‘Action’_, _‘Description’_ and _‘Status’_ within their request * Posting to the _/activities_ endpoint will create a new activity * Posting to the _/activities/{ID}_ endpoint will append the content to the detail of the specified activity
     * @summary Create an activity
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param activity
     */
    async create(params, options) {
        const activity = __rest(params || {}, []);
        const localVarPath = this.host + '/activities';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        localVarHeaderParams['Content-Type'] = 'application/vnd.whispir.activity-v1+json';
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.activity-v1+json';
        Object.assign(localVarHeaderParams, options === null || options === void 0 ? void 0 : options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this.useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(activity, "Activity")
        };
        let authenticationPromise = Promise.resolve();
        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }
        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                (0, request_1.default)(localVarRequestOptions, (error, response, body) => {
                    var _a, _b;
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = models_1.ObjectSerializer.deserialize(body, "Activity");
                            // Special case to extract the resource identifier from the `Location` header.
                            const checkLocation = (_b = (_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.match(/\/([^\/]+)\/?$/);
                            let id = (checkLocation && checkLocation[1]) ? checkLocation[1] : undefined;
                            resolve(Object.assign({ lastResponse: response.toJSON(), id }, body));
                        }
                        else {
                            reject(new apis_1.HttpError(body));
                        }
                    }
                });
            });
        });
    }
    /**
     * ### Search or Filter on Activity Logs Activity logs can become quickly huge owing to the amount of actions performed. In such cases, to have a proper filtering of data during a GET /activities, Whispir API provides very neat filtering options on the data.  All filter options are to be passed in as URL query parameters.  **Note:** The API currently results in a 404 Not Found when there are no activities present in the log for a given search criteria. This should not be not confused with a failed response. But rather as No Data Found.
     * @summary List activities
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     * @param action /activities?action&#x3D;Map
     * @param module /activities?module&#x3D;Message
     * @param user /activities?user&#x3D;james
     * @param workspace /activities?workspace&#x3D;Whispir.
     * @param status /activities?status&#x3D;Successful
     * @param description /activities?description&#x3D;Imported
     * @param startTime The date and time to start searching from in the format:dd/mm/yyyy hh:mm. This will search on the &#x60;time&#x60; field &lt;p&gt;/activities?startTime&#x3D;01/01/2015%2000:00&lt;/p&gt;
     * @param endTime The date and time to start searching from in the format:dd/mm/yyyy hh:mm &lt;p&gt;/activities?endTime&#x3D;01/01/2015%2000:00&lt;/p&gt;
     */
    async list(params, options) {
        const { limit = 20, offset = 0, sortOrder, sortFields, action, module, user, workspace, status, description, startTime, endTime, } = params || {};
        const localVarPath = this.host + '/activities';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (limit !== undefined) {
            localVarQueryParameters['limit'] = models_1.ObjectSerializer.serialize(limit, "number");
        }
        if (offset !== undefined) {
            localVarQueryParameters['offset'] = models_1.ObjectSerializer.serialize(offset, "number");
        }
        if (sortOrder !== undefined) {
            localVarQueryParameters['sortOrder'] = models_1.ObjectSerializer.serialize(sortOrder, "'asc' | 'desc'");
        }
        if (sortFields !== undefined) {
            localVarQueryParameters['sortFields'] = models_1.ObjectSerializer.serialize(sortFields, "string");
        }
        if (action !== undefined) {
            localVarQueryParameters['action'] = models_1.ObjectSerializer.serialize(action, "'Create' | 'Update' | 'Move' | 'Copy' | 'Draft' | 'Send' | 'Modified' | 'Delete' | 'Contact Import File' | 'Login' | 'Approve' | 'Reject' | 'Dispatch' | 'Register' | 'Accept' | 'Closed' | 'Map' | 'Un-map'");
        }
        if (module !== undefined) {
            localVarQueryParameters['module'] = models_1.ObjectSerializer.serialize(module, "'System' | 'Message' | 'Scheduled Message' | 'User' | 'Contact' | 'DistributionList' | 'Template' | 'Workspace' | 'Event' | 'WebService' | 'Settings' | 'Conversation' | 'Gateway' | 'Workspace Mapping' | 'Folders' | 'Team' | 'RSS' | 'API Mapping' | 'Asset' | 'Instruction'");
        }
        if (user !== undefined) {
            localVarQueryParameters['user'] = models_1.ObjectSerializer.serialize(user, "string");
        }
        if (workspace !== undefined) {
            localVarQueryParameters['workspace'] = models_1.ObjectSerializer.serialize(workspace, "string");
        }
        if (status !== undefined) {
            localVarQueryParameters['status'] = models_1.ObjectSerializer.serialize(status, "'Successful' | 'Failed' | 'Rejected'");
        }
        if (description !== undefined) {
            localVarQueryParameters['description'] = models_1.ObjectSerializer.serialize(description, "string");
        }
        if (startTime !== undefined) {
            localVarQueryParameters['Start time'] = models_1.ObjectSerializer.serialize(startTime, "string");
        }
        if (endTime !== undefined) {
            localVarQueryParameters['End time'] = models_1.ObjectSerializer.serialize(endTime, "string");
        }
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.activity-v1+json';
        Object.assign(localVarHeaderParams, options === null || options === void 0 ? void 0 : options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
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
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                (0, request_1.default)(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = models_1.ObjectSerializer.deserialize(body, "ActivityCollection");
                            resolve(Object.assign({ lastResponse: response.toJSON() }, body));
                        }
                        else {
                            reject(new apis_1.HttpError(body));
                        }
                    }
                });
            });
        });
    }
    /**
     * ## Restricting to only a single workspace  By default, GET /activities returns all the activities at company level. This covers all the workspaces. So, if the items has to limited to a specific workspace, one has to use the workspace as the endpoint and activities followed by it.
     * @summary List workspace activities
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     */
    async listByWorkspace(params, options) {
        const { workspaceId, limit = 20, offset = 0, sortOrder, sortFields, } = params || {};
        const localVarPath = this.host + '/workspaces/{workspaceId}/activities'
            .replace('{' + 'workspaceId' + '}', encodeURIComponent(String(workspaceId)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (limit !== undefined) {
            localVarQueryParameters['limit'] = models_1.ObjectSerializer.serialize(limit, "number");
        }
        if (offset !== undefined) {
            localVarQueryParameters['offset'] = models_1.ObjectSerializer.serialize(offset, "number");
        }
        if (sortOrder !== undefined) {
            localVarQueryParameters['sortOrder'] = models_1.ObjectSerializer.serialize(sortOrder, "'asc' | 'desc'");
        }
        if (sortFields !== undefined) {
            localVarQueryParameters['sortFields'] = models_1.ObjectSerializer.serialize(sortFields, "string");
        }
        localVarHeaderParams['Accept'] = 'application/vnd.whispir.activity-v1+json';
        Object.assign(localVarHeaderParams, options === null || options === void 0 ? void 0 : options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
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
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                (0, request_1.default)(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = models_1.ObjectSerializer.deserialize(body, "ActivityCollection");
                            resolve(Object.assign({ lastResponse: response.toJSON() }, body));
                        }
                        else {
                            reject(new apis_1.HttpError(body));
                        }
                    }
                });
            });
        });
    }
}
exports.ActivitiesApi = ActivitiesApi;

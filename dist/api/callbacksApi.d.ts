import { Callback, CallbackWrite } from '../model/callback';
import { CallbackCallWrite } from '../model/callbackCall';
import { CallbackCallCollection } from '../model/callbackCallCollection';
import { CallbackCollection } from '../model/callbackCollection';
import { Interceptor } from '../model/models';
import { ApiResponse, CreateResponse, ApiConfig, RequestOptions } from './apis';
type CallbackCallListParams = {
    /**
    * Enter Callbacks Id
    */
    callbackId: string;
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
    /**
    * To specifically retrieve the FAILED/SUCCESS calls, one can pass a status query param in the URL.
    */
    status?: 'SUCCESS' | 'FAILED';
};
type CallbackCallUpdateParams = {
    /**
    * Enter Callback id.
    */
    callbackId: string;
    /**
    * The unique ID of the specific call within Whispir
    */
    id: string;
} & CallbackCallWrite;
type CallbackCreateParams = {} & CallbackWrite;
type CallbackDeleteParams = {
    /**
    * Enter Callback id.
    */
    callbackId: string;
};
type CallbackListParams = {
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
type CallbackRetrieveParams = {
    /**
    * Enter Callbacks Id
    */
    callbackId: string;
};
type CallbackUpdateParams = {
    /**
    * Enter Callback id.
    */
    callbackId: string;
} & CallbackWrite;
export declare class CallbacksApi {
    protected defaultHeaders: any;
    protected useQuerystring: boolean;
    protected interceptors: Interceptor[];
    protected host: string;
    constructor(config: ApiConfig);
    addInterceptor(interceptor: Interceptor): void;
    /**
     * List of calls to the callback
     * @summary List callback calls
     * @param xApiKey The API key for authentication.
     * @param callbackId Enter Callbacks Id
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     * @param status To specifically retrieve the FAILED/SUCCESS calls, one can pass a status query param in the URL.
     */
    listCalls(params?: CallbackCallListParams, options?: RequestOptions): Promise<ApiResponse<CallbackCallCollection>>;
    /**
     * As every call to a callback endpoint is now stored within the calls endpoint, it’s possible that when failed calls are successfully processed through a manual exercise, that these calls will then need to be updated to reflect the current status.  Take the following example: 1.  Callback server becomes unavailable 2.  A message is sent via Whispir with callbacks enabled. 3.  The Message gets a response, and this triggers the callback 4.  The callback server is unavailable, so the response is stored with a status of \'FAILED’ 5.  After 24h, the callback server becomes available again. Retries have stopped, so this information will not automatically flow into the callback server. 6.  The customer writes a script to GET all of the calls stored in the /calls endpoint and process them. 7.  Once successfully processed, the customer’s script should update the contents of the /calls endpoint to reflect the current status of \'SUCCESS’.  This process can be facilitated with the use of a PUT request to the /calls endpoint in Whispir.  To update a list of attempted API calls from the Whispir API you can execute an HTTP PUT using the /calls endpoint on a specific callback.  Users can specify multiple IDs to be updated using the following notation:  `/callbacks/:id/calls?id=ID1&id=ID2&id=ID3...`  This ensures that all callbacks that have been processed can be updated in a single API call, rather than having to make a single API call per callback attempt.  The PUT request takes a single API parameter in the body
     * @summary Update a callback call status
     * @param xApiKey The API key for authentication.
     * @param callbackId Enter Callback id.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param id The unique ID of the specific call within Whispir
     * @param callbackCall The Status can be either of SUCCESS or FAILED only, and you can update the status to a singular value for upto 100 ids in a single call by passing the IDs in the URL
     */
    updateCall(params?: CallbackCallUpdateParams, options?: RequestOptions): Promise<ApiResponse>;
    /**
     * Whispir’s callback service can be configured to send simple notifications and some associated metadata via API callbacks to an endpoint of your choice when one of the following events occurs:  - A message has been replied to - A message delivery failure occurred [wrong number or service unavailable]  > **IMPORTANT**: unlike all the other API endpoints seen so far, Callbacks are not defined at a Workspace level but at a Company level. In other words, they can be referenced from any Workspace of that Company.  Callbacks are used widely in web applications to transfer information that may become available at some point in the future. These are sometimes referred to as ‘webhooks’.  The benefits of using API callbacks are: - Whispir will instantly notify your callback server when a change has occurred on Whispir platform. - You won\'t need to continuously poll the `/messageresponses` or `/messagestatus` endpoints, so you won\'t be reducing your API daily cap. - Callbacks themselves are on us, so they do not count towards the daily quota limits. - Response-based workflows can be built quickly and effectively.  The following diagram explains the entire high-level process: ![API diagram](https://github.com/whispir/openapi/blob/main/assets/images/Whispir_API_diagram.png?raw=true)  ## Callback endpoint validation During callback creation, Whispir makes a `GET` request to ensure the callback `url` provided is valid and available. The HTTP response code returned by the callback endpoint for this request must be `200`. Any other code is considered a failure and the callback creation will fail. This is the only time a `GET` request is made. Subsequent requests (callbacks) will all be `POST` requests.  ## Configuration tips  - Always use a domain name for the callback. Do not use an IP. - Ensure that your callback server is reachable on the internet. It should not be localhost or an intranet-only application that can\'t be reached from the World Wide Web. - Limit the port to 80 or 443. Do not use any other ports. - Depending on the type chosen (‘json’ or ‘xml’) for the Content-Type, Whispir would make a similar `GET` (and subsequently `POST`) call. Ensure that your web server is configured to handle such MIME types. - Most importantly, if your application infrastructure is behind a firewall, make sure that the firewall allows an incoming `POST` request.
     * @summary Create a callback
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param callback Callbacks list object that needs to be create Callbacks
     */
    create(params?: CallbackCreateParams, options?: RequestOptions): Promise<CreateResponse<Callback>>;
    /**
     * Delete a callback object
     * @summary Delete a callback
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param callbackId Enter Callback id.
     */
    delete(params?: CallbackDeleteParams, options?: RequestOptions): Promise<ApiResponse>;
    /**
     * List callbacks
     * @summary List callbacks
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     */
    list(params?: CallbackListParams, options?: RequestOptions): Promise<ApiResponse<CallbackCollection>>;
    /**
     * Retrieve a callback object
     * @summary Retrieve a callback
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param callbackId Enter Callbacks Id
     */
    retrieve(params?: CallbackRetrieveParams, options?: RequestOptions): Promise<ApiResponse<Callback>>;
    /**
     * Update a callback object
     * @summary Update a callback
     * @param xApiKey The API key for authentication.
     * @param callbackId Enter Callback id.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param callback The Callback object to update
     */
    update(params?: CallbackUpdateParams, options?: RequestOptions): Promise<ApiResponse>;
}
export {};

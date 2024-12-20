import { CallbackAuth, CallbackAuthWrite } from './callbackAuth';
import { CallbackOptions, CallbackOptionsWrite } from './callbackOptions';
import { Link } from './link';
export type CallbackWrite = {
    /**
    * The name of the callback.   This is the value that should be passed in the message payload for triggering the callbacks
    */
    'name': string;
    /**
    * Specifies the service URL that API Callbacks should be forwarded to.
    */
    'url': string;
    'auth': CallbackAuthWrite;
    /**
    * Specifies the content type that should be sent to this endpoint.
    */
    'contentType': 'json' | 'xml';
    /**
    * Specifies whether HTML should be stripped from responses.
    */
    'removeHTML': 'enabled' | 'disabled';
    /**
    * Specifies whether Whispir should perform retries in the event there is a failure accessing the callback service.
    */
    'retriesEnabled': boolean;
    /**
    * Whispir notify this email address that a callback has failed (only when retries are disabled).   The email will contain the details of the callback content.
    */
    'email': string;
    'callbacks': CallbackOptionsWrite;
};
/**
* The callback object, used to configure the callback (also known as webhook).
*/
export declare class Callback {
    /**
    * The id of the callback.   This is the value that should be passed when referring to the callback using the API endpoints
    */
    'id': string;
    /**
    * The name of the callback.   This is the value that should be passed in the message payload for triggering the callbacks
    */
    'name': string;
    /**
    * Specifies the service URL that API Callbacks should be forwarded to.
    */
    'url': string;
    'auth': CallbackAuth;
    /**
    * Specifies the content type that should be sent to this endpoint.
    */
    'contentType': 'json' | 'xml';
    /**
    * Specifies whether HTML should be stripped from responses.
    */
    'removeHTML': 'enabled' | 'disabled';
    /**
    * Specifies whether Whispir should perform retries in the event there is a failure accessing the callback service.
    */
    'retriesEnabled': boolean;
    /**
    * Whispir notify this email address that a callback has failed (only when retries are disabled).   The email will contain the details of the callback content.
    */
    'email': string;
    'callbacks': CallbackOptions;
    /**
    * A [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) link array, describing all discoverable resources in relation to the original request.
    */
    'link': Array<Link>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}

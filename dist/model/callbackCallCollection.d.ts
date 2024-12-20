import { CallbackCall, CallbackCallWrite } from './callbackCall';
import { Link } from './link';
export type CallbackCallCollectionWrite = {
    /**
    * A list of callbacks
    */
    'calls'?: Array<CallbackCallWrite>;
    /**
    * Provides the total number of records fetched. This attribute may return \"No records found\" when there are no callbacks available.
    */
    'status'?: string;
};
/**
* List of callback calls
*/
export declare class CallbackCallCollection {
    /**
    * A list of callbacks
    */
    'calls': Array<CallbackCall>;
    /**
    * Provides the total number of records fetched. This attribute may return \"No records found\" when there are no callbacks available.
    */
    'status': string;
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

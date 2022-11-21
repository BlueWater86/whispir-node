
import { RequestFile } from './models';
import { LinkInner } from './linkInner';
import { MessageResponseDetailedMessageresponsesInner } from './messageResponseDetailedMessageresponsesInner';

/**
* The detailed message response object.
*/
export class MessageResponseDetailed {
    /**
    * The message response statuses.
    */
    'messageresponses': Set<MessageResponseDetailedMessageresponsesInner>;
    /**
    * A [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) link object, describing all discoverable resources in relation to the original request.
    */
    'link': Array<LinkInner>;
    /**
    * The message response pagination status.
    */
    'status'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "messageresponses",
            "baseName": "messageresponses",
            "type": "Set<MessageResponseDetailedMessageresponsesInner>"
        },
        {
            "name": "link",
            "baseName": "link",
            "type": "Array<LinkInner>"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return MessageResponseDetailed.attributeTypeMap;
    }
}


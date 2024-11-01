import { DeliveryReceipt, DeliveryReceiptWrite } from './deliveryReceipt';
import { Email, EmailWrite } from './email';
import { Features, FeaturesWrite } from './features';
import { Link } from './link';
import { Resource, ResourceWrite } from './resource';
import { Social, SocialWrite } from './social';
import { Voice, VoiceWrite } from './voice';
import { Web, WebWrite } from './web';
export type MessageWrite = {
    /**
    * Allows a combination of phone numbers, email address, Whispir Contact MRIs, User MRI, Distribution List MRI, separated by `,`.  Whispir will pick the relevant recipients based on the channels provided in the request payload  (including template information).  The maximum payload size rule applies.  When used for bulk messages, this field is optional, as bulk messages has another model to specify the `to` field recipients.
    */
    'to': string;
    /**
    * The message subject. This is common for both SMS and Email channels.  Read `body` notes on limits.  The maximum payload size rule applies.  When used for templates, this field is optional.
    */
    'subject': string;
    /**
    * The SMS body.  The maximum payload size rule applies.  IMPORTANT: The total SMS length is 1570 characters for english text and 800 when UTF-8 characters are used (primarily non-english)  The 1570 length is a combination of subject and body.
    */
    'body'?: string;
    'email'?: EmailWrite;
    'voice'?: VoiceWrite;
    'web'?: WebWrite;
    'social'?: SocialWrite;
    /**
    * Allows the user to modify the message behaviour for replies and DLRs (delivery receipts).  - `defaultNoReply`: Used to reject any replies to this message. - `noDlr`: Used to specify that DLRs should not be enabled for this message.
    */
    'type'?: 'default' | 'defaultNoReply' | 'noDlr';
    'features'?: FeaturesWrite;
    'resource'?: ResourceWrite;
    /**
    * The identifier for the Message Template. Specification of this attribute is preferred over the `messageTemplateName`, to provide an absolute and non-changing reference to the Message Template.
    */
    'messageTemplateId'?: string;
    /**
    * A human-readable name for the Message Template.
    */
    'messageTemplateName'?: string;
    /**
    * The identifier for the Callback to be invoked on Message delivery events.
    */
    'callbackId'?: string;
    /**
    * Set of key-value pairs that you can attach to a callback. This can be useful for returning additional information about the object in a structured format.
    */
    'callbackParameters'?: object;
    /**
    * A label to tag the message, useful for grouped viewing and filtering in the UI and via API `GET /messages?label=example`.  **IMPORTANT**: When this label is used, Whispir Reporting ignores the “Category” labels tied to the messages. Please ensure you are using this as per your business needs and such usage does not affect the reports generated via the \"Category\" grouping.
    */
    'label'?: string;
    /**
    * The identifier for the Event to trigger.
    */
    'eventId'?: string;
    /**
    * The type of message, used to enable message scheduling.
    */
    'messageType'?: 'SCHEDULED';
    /**
    * The schedule type, used to enable single or repeated message scheduling.
    */
    'scheduleType'?: 'ONCE' | 'REPEAT';
    /**
    * For `ONCE` scheduled messages, specifies the date to trigger the single delivery. For `REPEATED` scheduled messages, the time at which the first of them will be sent.
    */
    'scheduleDate'?: string;
    /**
    * Specifies how many times the scheduled message will be sent to the recipient.
    */
    'repetitionCount'?: number;
    /**
    * The interval in days between each scheduled message repetition.
    */
    'repeatDays'?: number;
    /**
    * The interval in hours between each scheduled message repetition.
    */
    'repeatHrs'?: number;
    /**
    * The interval in minutes between each scheduled message repetition.
    */
    'repeatMin'?: number;
    'dlr'?: DeliveryReceiptWrite;
};
/**
* Whispir has a maximum API request payload size of 10MB. Whispir will reject the request if the payload is any bigger. This payload size limit should be adhered to when creatin the message payload.
*/
export declare class Message {
    /**
    * Allows a combination of phone numbers, email address, Whispir Contact MRIs, User MRI, Distribution List MRI, separated by `,`.  Whispir will pick the relevant recipients based on the channels provided in the request payload  (including template information).  The maximum payload size rule applies.  When used for bulk messages, this field is optional, as bulk messages has another model to specify the `to` field recipients.
    */
    'to': string;
    /**
    * The message subject. This is common for both SMS and Email channels.  Read `body` notes on limits.  The maximum payload size rule applies.  When used for templates, this field is optional.
    */
    'subject': string;
    /**
    * The SMS body.  The maximum payload size rule applies.  IMPORTANT: The total SMS length is 1570 characters for english text and 800 when UTF-8 characters are used (primarily non-english)  The 1570 length is a combination of subject and body.
    */
    'body': string;
    'email': Email;
    'voice': Voice;
    'web': Web;
    'social': Social;
    /**
    * Allows the user to modify the message behaviour for replies and DLRs (delivery receipts).  - `defaultNoReply`: Used to reject any replies to this message. - `noDlr`: Used to specify that DLRs should not be enabled for this message.
    */
    'type': 'default' | 'defaultNoReply' | 'noDlr';
    'features': Features;
    'resource': Resource;
    /**
    * The identifier for the Message Template. Specification of this attribute is preferred over the `messageTemplateName`, to provide an absolute and non-changing reference to the Message Template.
    */
    'messageTemplateId': string;
    /**
    * A human-readable name for the Message Template.
    */
    'messageTemplateName': string;
    /**
    * The identifier for the Callback to be invoked on Message delivery events.
    */
    'callbackId': string;
    /**
    * Set of key-value pairs that you can attach to a callback. This can be useful for returning additional information about the object in a structured format.
    */
    'callbackParameters': object;
    /**
    * A label to tag the message, useful for grouped viewing and filtering in the UI and via API `GET /messages?label=example`.  **IMPORTANT**: When this label is used, Whispir Reporting ignores the “Category” labels tied to the messages. Please ensure you are using this as per your business needs and such usage does not affect the reports generated via the \"Category\" grouping.
    */
    'label': string;
    /**
    * The identifier for the Event to trigger.
    */
    'eventId': string;
    /**
    * The type of message, used to enable message scheduling.
    */
    'messageType': 'SCHEDULED';
    /**
    * The schedule type, used to enable single or repeated message scheduling.
    */
    'scheduleType': 'ONCE' | 'REPEAT';
    /**
    * For `ONCE` scheduled messages, specifies the date to trigger the single delivery. For `REPEATED` scheduled messages, the time at which the first of them will be sent.
    */
    'scheduleDate': string;
    /**
    * Specifies how many times the scheduled message will be sent to the recipient.
    */
    'repetitionCount': number;
    /**
    * The interval in days between each scheduled message repetition.
    */
    'repeatDays': number;
    /**
    * The interval in hours between each scheduled message repetition.
    */
    'repeatHrs': number;
    /**
    * The interval in minutes between each scheduled message repetition.
    */
    'repeatMin': number;
    /**
    * The message sender\'s Whispir User MRI.
    */
    'from': string;
    /**
    * The direction of the sent message.
    */
    'direction': 'OUTGOING';
    /**
    * Details the responses received for the sent message across all channels. Refer to `/messageresponses` to get the detailed response data.
    */
    'responseCount': string;
    /**
    * Epoch time (refers to Unix TimeStamp format starting Jan 1, 1970) denoting the time the message was sent. For bulk messages and messages with multiple recipients this value is tied to the timestamp when the message was received and processed by Whispir.
    */
    'createdTime': number;
    /**
    * The validity of the WhatsApp channel message.
    */
    'whatsappValidMessage': boolean;
    /**
    * The validity of the message body.
    */
    'validBody': boolean;
    /**
    * The validity of the message subject.
    */
    'validSubject': boolean;
    'dlr': DeliveryReceipt;
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

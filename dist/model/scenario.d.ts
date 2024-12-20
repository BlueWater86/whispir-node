import { Email, EmailWrite } from './email';
import { Message, MessageWrite } from './message';
import { Social, SocialWrite } from './social';
import { Voice, VoiceWrite } from './voice';
import { Web, WebWrite } from './web';
export type ScenarioWrite = {
    /**
    * Specifies the name of the scenario
    */
    'name': string;
    /**
    * Specifies the description of the scenario
    */
    'description': string;
    /**
    * Specifies the usage permission - 1)EVERYONE 2)SELECTEDUSERS When SELECTEDUSERS is provided, then `allowedUserIds` shall contain the userID of the allowed users.
    */
    'allowedUsers'?: 'EVERYONE' | 'SELECTEDUSERS';
    /**
    * Specifies the comma separated list of users who can run this scenario.Only contains value when the allowedUsers is set to `SELECTEDUSERS`
    */
    'allowedUserIds'?: string;
    'message': MessageWrite;
    /**
    * Specifies the phone number or MRI or distribution list to which the message has to be sent
    */
    'to'?: string;
    /**
    * Specifies the subject of the message
    */
    'subject'?: string;
    /**
    * Specifies the label for the message (to view during reporting)
    */
    'label'?: string;
    'email'?: EmailWrite;
    'voice'?: VoiceWrite;
    'web'?: WebWrite;
    'social'?: SocialWrite;
};
/**
* Scenarios allows you to simplify the message delivery process through automated, one-click communications.
*/
export declare class Scenario {
    /**
    * Specifies the name of the scenario
    */
    'name': string;
    /**
    * Specifies the description of the scenario
    */
    'description': string;
    /**
    * Specifies the usage permission - 1)EVERYONE 2)SELECTEDUSERS When SELECTEDUSERS is provided, then `allowedUserIds` shall contain the userID of the allowed users.
    */
    'allowedUsers': 'EVERYONE' | 'SELECTEDUSERS';
    /**
    * Specifies the comma separated list of users who can run this scenario.Only contains value when the allowedUsers is set to `SELECTEDUSERS`
    */
    'allowedUserIds': string;
    'message': Message;
    /**
    * Specifies the phone number or MRI or distribution list to which the message has to be sent
    */
    'to': string;
    /**
    * Specifies the subject of the message
    */
    'subject': string;
    /**
    * Specifies the label for the message (to view during reporting)
    */
    'label': string;
    'email': Email;
    'voice': Voice;
    'web': Web;
    'social': Social;
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

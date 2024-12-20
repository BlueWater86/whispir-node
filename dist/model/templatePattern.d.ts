export type TemplatePatternWrite = {
    /**
    * The name of the response category. The same key is called `matchedCategory` when placed inside the `customParameters` of Callbacks payload
    */
    'name': string;
    /**
    * Specifies the mechanism for matching the textPrompt  The following options are available: - startsWith - contains - exactmatch  NOTE: none of them is case sensitive, so in the example above replying \"YES\" or \"yes\" or \"Yes\" makes no difference
    */
    'pattern': string;
    /**
    * Specifies the textual string that should be matched using the pattern (specified above) within the email, SMS or web response
    */
    'textPrompt': string;
    /**
    * The character (2–9, * or #) that the recipient of the voice call should enter to select a response option  **IMPORTANT**: please do NOT use the key \"1\" because this is already reserved to repeat the message
    */
    'voicePrompt': string;
    /**
    * The text-to-speech content that is dynamically read out when describing to the user what a particular response option is
    */
    'spokenVoicePrompt': string;
    /**
    * The hexadecimal colour code that is used in the Message Response Report to differentiate the groups of responses
    */
    'colour': string;
};
/**
* This object contains the responseTemplatePattern array, which contains each of the response rule elements. More details on the configuration of this object can be found below
*/
export declare class TemplatePattern {
    /**
    * The name of the response category. The same key is called `matchedCategory` when placed inside the `customParameters` of Callbacks payload
    */
    'name': string;
    /**
    * Specifies the mechanism for matching the textPrompt  The following options are available: - startsWith - contains - exactmatch  NOTE: none of them is case sensitive, so in the example above replying \"YES\" or \"yes\" or \"Yes\" makes no difference
    */
    'pattern': string;
    /**
    * Specifies the textual string that should be matched using the pattern (specified above) within the email, SMS or web response
    */
    'textPrompt': string;
    /**
    * The character (2–9, * or #) that the recipient of the voice call should enter to select a response option  **IMPORTANT**: please do NOT use the key \"1\" because this is already reserved to repeat the message
    */
    'voicePrompt': string;
    /**
    * The text-to-speech content that is dynamically read out when describing to the user what a particular response option is
    */
    'spokenVoicePrompt': string;
    /**
    * The hexadecimal colour code that is used in the Message Response Report to differentiate the groups of responses
    */
    'colour': string;
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

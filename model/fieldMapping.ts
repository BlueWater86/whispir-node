
import { RequestFile } from './models';


export type FieldMappingWrite = {
    /**
    * First Name of the Contact. Value of this field is used to map the field within the resource.
    */
    'firstName': string;
    /**
    * Last Name of the Contact. Value of this field is used to map the field within the resource.
    */
    'lastName': string;
    /**
    * The mobile phone number of the Contact. Value of this field is used to map the field within the newly created resource.
    */
    'workMobilePhone1': string;
    'personalMobilePhone1': string;
    'jobTitle': string;
    'companyName': string;
    /**
    * The email address of the Contact. Value of this field is used to map the field within the newly created resource.
    */
    'workEmailAddress1': string;
    /**
    * The country field of the contact. The value of this field is used to map to the field within the newly created contact.
    */
    'workCountry': string;
    /**
    * The timezone field of the contact. The value of this field is used to map to the timezone field within the newly created contact.
    */
    'timezone': string;
}

/**
* Mapping the data column in your resource file to the contact field value
*/
export class FieldMapping {
    /**
    * First Name of the Contact. Value of this field is used to map the field within the resource.
    */
    'firstName': string;
    /**
    * Last Name of the Contact. Value of this field is used to map the field within the resource.
    */
    'lastName': string;
    /**
    * The mobile phone number of the Contact. Value of this field is used to map the field within the newly created resource.
    */
    'workMobilePhone1': string;
    'personalMobilePhone1': string;
    'jobTitle': string;
    'companyName': string;
    /**
    * The email address of the Contact. Value of this field is used to map the field within the newly created resource.
    */
    'workEmailAddress1': string;
    /**
    * The country field of the contact. The value of this field is used to map to the field within the newly created contact.
    */
    'workCountry': string;
    /**
    * The timezone field of the contact. The value of this field is used to map to the timezone field within the newly created contact.
    */
    'timezone': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "firstName",
            "baseName": "firstName",
            "type": "string"
        },
        {
            "name": "lastName",
            "baseName": "lastName",
            "type": "string"
        },
        {
            "name": "workMobilePhone1",
            "baseName": "workMobilePhone1",
            "type": "string"
        },
        {
            "name": "personalMobilePhone1",
            "baseName": "personalMobilePhone1",
            "type": "string"
        },
        {
            "name": "jobTitle",
            "baseName": "jobTitle",
            "type": "string"
        },
        {
            "name": "companyName",
            "baseName": "companyName",
            "type": "string"
        },
        {
            "name": "workEmailAddress1",
            "baseName": "workEmailAddress1",
            "type": "string"
        },
        {
            "name": "workCountry",
            "baseName": "workCountry",
            "type": "string"
        },
        {
            "name": "timezone",
            "baseName": "timezone",
            "type": "string"
        }    
    ];

    static getAttributeTypeMap() {
        return FieldMapping.attributeTypeMap;
    }
}


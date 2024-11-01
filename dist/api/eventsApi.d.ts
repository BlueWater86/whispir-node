import { Event, EventWrite } from '../model/event';
import { EventCollection } from '../model/eventCollection';
import { Interceptor } from '../model/models';
import { ApiResponse, CreateResponse, ApiConfig, RequestOptions } from './apis';
type EventCreateParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
} & EventWrite;
type EventListParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * The name of the event template used
    */
    eventType: string;
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
type EventRetrieveParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * The identifier for the event.
    */
    eventId: string;
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
type EventUpdateParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * The identifier for the event.
    */
    eventId: string;
} & EventWrite;
export declare class EventsApi {
    protected defaultHeaders: any;
    protected useQuerystring: boolean;
    protected interceptors: Interceptor[];
    protected host: string;
    constructor(config: ApiConfig);
    addInterceptor(interceptor: Interceptor): void;
    /**
     * The bulk of the `Event` metadata is from fields that are generic, and only applicable to the customer that is using the module.  The owner or responsible person for the event could be a `/contacts` in the system. This ensures that proper communication is sent to the individual based on their preferred channel (`message`, `email`, `voice`) automatically without having to key in the phone, email, and other communication information again.  Most importantly, to create an event, one must have the create access for `Incident` row in the `Roles & Permission` section of the account settings.  When an `Event` occurs/is triggered, the related actions are to be performed. Each action has an owner (`actionOwner`), a set time (`actionDate`), and details associated with it (`actionDetails`).   `Events` have sub sections under them called as ‘actions’ (maximum of 10). So the action values are numbered: <li> actionDate1, actionOwner1, actionDetails1 </li> <li> actionDate2, actionOwner2, actionDetails2 </li> <li> … </li> <li> actionDate10, actionOwner10, actionDetails10 </li>  <!-- theme: warning --> > #### Things to note > The fields described below are defined through `name/value` pairs and to be added as part of `eventFieldList` array  ```generic_attributes json_schema {   \"title\": \"Event Fields\",   \"type\": \"object\",   \"properties\": {     \"actionDate\": {       \"type\": \"string\"       \"description: \"The start date of this action in dd/mm/yyyy HH:MI:SS 24 hour format\",       \"example\": \"11/09/2019 17:41:00\"     },     \"actionOwner\": {       \"type\": \"string\",       \"description\": \"The individual (contact) responsible for this action’s execution\",       \"example\": \"John Wick\",     },     \"actionDetails\": {       \"type\": \"string\",       \"description\": \"The detail description of this action\",       \"example\":\"investigation to take place asap.\"     },     \"summary\": {       \"type\": \"string\",       \"description\": \"Specifies the summary of the event. A single line that can be the equivalent of the subject of an email\",       \"example\":\"investigation to take place asap\"     },     \"status\": {       \"type\": \"string\",       \"description\": \"Specifies the status of the event. The status can be one of the following\",       \"enum\": [\"Active\", \"Resolved\", \"Open\"],       \"default\":\"Open\",       \"example\":\"Open\"     },        \"description\": {       \"type\": \"string\",       \"description\": \"Specifies the detailed description of the event\",       \"example\":\"investigation to take place asap\"     },    \"location\": {       \"type\": \"string\",       \"description\": \"Specifies the latitude and longitude values of the event location. This helps to show the event location on Whispir’s geo-map feature set and coordinated communication based on the geo-location of the event\",       \"example\":\"0.0,0.0\"     },    \"startDate\": {       \"type\": \"string\",       \"description\": \"Specifies the start date of the event. The date and time should be in the format `DD/MM/YYYY HH:MI:SS` (24 hour format)\",       \"example\":\"23/09/2019 17:21:00\"     },    \"endDate\": {       \"type\": \"string\",       \"description\": \"Specifies the end date of the event. The date and time should be in the format `DD/MM/YYYY HH:MI:SS` (24 hour format)\",       \"example\":\"23/09/2019 17:21:00\"     },     \"severity\" :{       \"type\": \"string\",       \"description\": \"Specifies the severity of the event. While this can change from company to company, the standard value set to be chosen from is            <li><b>Severity 5</b> – Routine Maintenance Tasks</li>          <li><b>Severity 4</b> – Scheduled System Changes</li>          <li><b>Severity SL3</b> – Minor Outage (some service degradation)</li>          <li><b>Severity SL2</b> – Moderate Outage (service degradation)</li>          <li><b>Severity SL1</b> – Major Outage (significant service unavailability)</li>       \",       \"example\": \"Severity 5\"     },     \"priority\" :{       \"type\": \"string\",       \"description\": \"Specifies the priority of the event. While this can change from company to company, the standard value set to choose from is         <li><b>Priority 5</b> – No Set Resolution Period</li>         <li><b>Priority 4</b> – < 1 week Resolution</li>         <li><b>Priority 3</b> – < 3 day Resolution</li>         <li><b>Priority 2</b> – < 1 day Resolution</li>         <li><b>Priority 1</b> – < 2 hour Resolution</li>       \",       \"enum\": [\"Priority 5\", \"Priority 4\", \"Priority 3\", \"Priority 2\", \"Priority 1\"],       \"example\": \"Severity 5\"     },    \"duration\": {       \"type\": \"string\",       \"description\": \"The duration of the event in `HH:MI:SS`. For example, `02:05:00`. This can be substituted in the place of end date if required. Or a subset of the time between the start and end dates.\",       \"example\":\"02:05:00\"     }        },   required: [\"actionDate\", \"actionOwner\", \"actionDetails\", \"startDate\"] } ``` ``` categorisation json_schema {   \"title\": \"Event Fields\",   \"type\": \"object\",   \"description: \"\",   \"properties\": {     \"category\" :{       \"type\": \"string\",       \"description\": \"Specifies the category of event. The default values to choose from are (`Internal Systems`, `External Systems`, `Infrastructure`)\",       \"example\": \"Internal Systems\"     },     \"subcategory\" :{       \"type\": \"string\",       \"description\": \"Specifies the subcategory in the category. The default values to choose from are (`Customer Impact`, `Cust & Staff Impact`,`Staff Impact`, `Impact Unknown`)\",       \"example\": \"Customer Impact\"     },     \"type\" :{       \"type\": \"string\",       \"description\": \"Specifies the type of event. The default values to choose from are (`Multiple Issues`, `NIL`,`Network`, `Applications`, `Mobile Apps`)\",       \"example\": \"Customer Impact\"     },     \"externalVendor\" :{       \"type\": \"string\",       \"description\": \"Specifies the name/contact who is the external vendor related to this event\",       \"example\": \"ABC\"     },      \"lineNumber\" :{       \"type\": \"string\",       \"description\": \"Specifies the line number (production lines)\",       \"example\": \"ABC\"     },     \"externalCaseNumber\" :{       \"type\": \"string\",       \"description\": \"Specifies the number as tracked by an external party related to this event\",       \"example\": \"ABC\"     },   } } ``` ``` affected_services json_schema {   \"title\": \"Event Fields\",   \"type\": \"object\",   \"description: \"\",   \"properties\": {     \"platform\" :{       \"type\": \"string\",       \"description\": \"Specifies the platform in the company that this event is associated with\",       \"example\": \"ABC\"     },     \"services\" :{       \"type\": \"string\",       \"description\": \"Specifies the service in the company that this event is associated with\",       \"example\": \"ABC\"     },   } } ``` ``` impact json_schema {   \"title\": \"Event Fields\",   \"type\": \"object\",   \"description: \"\",   \"properties\": {     \"impactCondition\" :{       \"type\": \"string\",       \"description\": \"Specifies the impact condition of this event to the company. These values can be configured via custom lists as these can be very specific to the company. The default values to choose from are (`All services not available`, `All services degraded`, `Some services not available`, `Some services degraded`, `No Impact`, `Unknown`)\",       \"example\": \"Unknown\"     },     \"impactToOrg\" :{       \"type\": \"string\",       \"description\": \"Specifies the impact condition of this event to the company. These values can be configured via custom lists as these can be very specific to the company. The default values to choose from are (`All services not available`, `All services degraded`, `Some services not available`, `Some services degraded`, `No Impact`, `Unknown`)\",       \"example\": \"Unknown\"     },     \"locations\" :{       \"type\": \"string\",       \"description\": \"Specifies the impact location of this event to a company’s operational geographies. These values can be configured via custom lists as these can be very specific to the company\",       \"example\": \"0.0,0.0\"     },   } } ``` ``` example {     ...,     eventFieldList: [{         \"name\": \"actionDate1\",         \"value\": \"11/09/2019 17:41:00\"       },       {         \"name\": \"actionOwner1\",         \"value\": \"John Wick\"       },       {           \"name\": \"actionDetails1\",         \"value\": \"investigation to take place asap.\"       },       {         \"name\": \"summary\",         \"value\": \"Outage of systems in Sydney\"       },       {         \"name\": \"status\",         \"value\": \"Open\"       },       {         \"name\": \"description\",         \"value\": \"ATMs are non responsive, teams to be sent to investigate.\"       },       {         \"name\": \"category\",         \"value\": \"Internal\"       },       {        \"name\": \"startDate\",        \"value\": \"11/09/2019 17:41:00\"       },       {        \"name\": \"severity\",        \"value\": \"Severity 3 - Minor Outage (Some Service Degradation)\"       },       ... and so on,   }] }                   ``` <!-- theme: info -->  > #### A thing to know > On top of the list of event attributes listed above, you may introduce other (alias) name and title fields <li> e.g (`otherFirstName`, `otherLastName`, `otherTitle`) </li>  <h2>Sending messages using event data</h2>  Once you’ve finished creating your event data in the Whispir platform, the next logical step is to deliver a notification about the event. This action can be performed using the existing `/messages` endpoint, with the `eventId` as an attribute of the message.  * Including this `eventId` links the message to the event, and allow you to use any attribute of the event within your message payload. * Any event fields populated on the event are automatically populated within the message. * Any attributes that are supplied within the message take priority over any attributes that are from the event. * The user should not be required to enter any `attributes` as these will be retrieved from the linked event. * The event fields automatically populate the attributes in the message body (based on the relationships set in the <b> Admin > Settings > Attributes > Message Event Attribute Map</b>).  <!-- theme: warning --> > #### Things to note > * If the `Event` doesn\'t contain an event field, and there is no relevant attribute field supplied > in the message payload, the `@@` tag will not be resolved. > * If you don\'t supply an attribute in the message payload, and this has also not been supplied from the event, the field simply will not be resolved within the message.
     * @summary Create an event
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param event The Event object to create
     */
    create(params?: EventCreateParams, options?: RequestOptions): Promise<CreateResponse<Event>>;
    /**
     * List event objects
     * @summary List events
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param eventType The name of the event template used
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     */
    list(params?: EventListParams, options?: RequestOptions): Promise<ApiResponse<EventCollection>>;
    /**
     * Retrieve an event object
     * @summary Retrieve an event
     * @param workspaceId The identifier for the workspace.
     * @param eventId The identifier for the event.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     */
    retrieve(params?: EventRetrieveParams, options?: RequestOptions): Promise<ApiResponse<Event>>;
    /**
     * Update an event object
     * @summary Update an event
     * @param workspaceId The identifier for the workspace.
     * @param eventId The identifier for the event.
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param event The Event object to update
     */
    update(params?: EventUpdateParams, options?: RequestOptions): Promise<ApiResponse>;
}
export {};

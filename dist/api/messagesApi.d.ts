import { Message, MessageWrite } from '../model/message';
import { MessageCollection } from '../model/messageCollection';
import { MessageResponseCollection } from '../model/messageResponseCollection';
import { MessageStatusCollection } from '../model/messageStatusCollection';
import { Interceptor } from '../model/models';
import { ApiResponse, CreateResponse, ApiConfig, RequestOptions } from './apis';
type MessageCreateParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
} & MessageWrite;
type MessageListParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
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
type MessageResponseListParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * Enter message id
    */
    messageId: string;
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
    * The view for the message response.
    */
    view?: 'summary' | 'detailed';
    /**
    * The filter for the message response.
    */
    filter?: 'noresponse' | 'notmatched' | 'responserule';
};
type MessageRetrieveParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * The identifier for the message.
    */
    messageId: string;
};
type MessageStatusListParams = {
    /**
    * The identifier for the workspace.
    */
    workspaceId: string;
    /**
    * Enter message id
    */
    messageId: string;
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
    * The view for the message status.
    */
    view?: 'summary' | 'detailed';
    /**
    * The filter for the message status.
    */
    filter?: 'default' | 'responserule';
};
export declare class MessagesApi {
    protected defaultHeaders: any;
    protected useQuerystring: boolean;
    protected interceptors: Interceptor[];
    protected host: string;
    constructor(config: ApiConfig);
    addInterceptor(interceptor: Interceptor): void;
    /**
     * Communications are the core of what the Whispir Platform API offers as a service to customers.     Whispir has the ability to send communications across 7 different channels in a single API request:   - **SMS** - up to 1600 characters per message, premium routes, delivery receipts   - **Email** - free email messaging with HTML and Plain Text support  - **Voice** - high quality outbound voice calls delivered to mobiles and landlines within seconds   - **Rich Messages** - personalised, targeted rich messaging to drive conversations   - **Twitter** - support for instant publishing to multiple twitter accounts   - **Facebook** - simplify the process of publishing to multiple facebook accounts instantaneously   - **RSS** - easily generate RSS feeds for consumption by other services  All communications are driven from the Messages endpoint resources within the API. This endpoint allows a user to perform the following tasks: 1.  Create and send a new message 2.  Retrieve a list of previously sent messages    * * *  ### Using Templates Messages can simply specify the `messageTemplateId` in the messages request, instead of specifying the entire content payload.  The message template can then easily be changed (using either another API request or by logging in to the Whispir Platform) and the part of the application sending the messages does not need to be altered.    * * *  ### Callback Parameters  The callback API allows you to pass in any values (parameters), which you want to be returned as is, included in the callback response.  * * *  ### Using Events  Once you have created an [Event](./openapi.yaml/paths/~1workspaces~1{workspaceId}~1events/post) in the Whispir Platform, the next logical step is to be able to deliver a notification about the event.  ```json {   \"to\": \"+1000000000\",   \"subject\": \"Event Notification\",   \"eventId\": \"2EE7FEA3343662BE\",   \"body\": \"An event has occurred: @@summary@@. A resolution is required by @@actionDate1@@.\" } ```  * * *  ### Message Variables  Whispir allows the use of message variables to dynamically customise the content in a message. Available variables include [Native Tags](#native-tags), [System Tags](#system-tags), and [Custom Tags](#custom-tags). Each of these variables are described in the following sections.  #### Native Tags  When sending messages using the Whispir API you can automatically customise your communications including recipients information as part of the message. This is facilitated by the Whispir\'s native message variables [or native tags] that will be resolved against the recipients MRIs. > **IMPORTANT**: the following tags can be included in any SMS, email or voice message. They are NOT meant to be used in rich messages. In this case recipient-specific fields can be populated using the Whispir JavaScript API.  Contact Tag | Description ---------|----------  @@first_name@@ | Recipient’s first name.  <br/> For example, John.   @@last_name@@ | Recipient’s last name. <br/> For example, Smith.  @@recipient_email@@ | Recipient’s primary email address.<br/>For example, jsmith@email.com   @@recipient_sms@@ | Recipient’s primary mobile phone number. <br/><br/>For example, 61400400400.   @@recipient_voice@@ | Recipient’s primary phone number for voice calls.<br/><br/> For example, 61400400400.   @@pin@@ | Whispir message retrieval service call back PIN (only populated when voice is used). <br/><br/> For example, 1234.   @@recipient_role@@ | Resolves to the recipient’s ‘Role’ field.<br/><br/> For example, Manager.   @@recipient_additionalrole@@ | Resolves to the recipient’s ‘Additional Role’ field. <br/><br/>For example, Team Leader.   @@team_name1@@ | Resolves to the recipient’s ‘Team Name’ field.<br/><br/> For example, Red Team.   @@messagelabel@@| Resolves to the label field of the sent message. <br/><br/>For example, Incident #1234.   @@messagecategories@@ | Resolves to the list of categories used in the message, separated with commas. <br/><br/>For example, Product Update.    ``` JSON POST https://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+json Accept: application/vnd.whispir.message-v1+json   {    \"to\" : \"John_Wick.1143139@Contact.whispir.sg\",    \"subject\" : \"Test SMS Message with tags\",    \"body\" : \"Hi @@first_name@@. This is your message.\" } ``` ``` XML POST https://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+xml Accept: application/vnd.whispir.message-v1+xml   <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <ns2:message xmlns:ns2=\"http://schemas.api.whispir.com\">     <to>John_Wick.1143139@Contact.whispir.sg</to>     <subject>Test SMS Message with tags</subject>     <body>Hi @@first_name@@. This is your message.</body> </ns2:message> ```   The main difference with the examples seen so far is given here by the `to` field of the payloads, where a Contact MRI is specified. This reference allows the Whispir platform to inspect the Contact to retrieve the Contact tags.  * * *  #### System Tags  When sending messages using the Whispir API, you can automatically include system-generated information via system variables. Each of them will resolve to the value obtained when you send the message. Unlike the preceding ones, they don\'t depend from the Contacts information stored in Whispir, so they can be included also in messages where the recipients are not represented by their MRI.  System Tag | Description| ---------|---------- @@dd@@| Current day with leading zero. <br/> For example, 08. @@mm@@ | Current month with leading zero. <br/> For example, 06. @@yy@@| Current year, short form.<br/>For example, 22. @@yyyy@@| Current year, long form. <br/><br/>For example, 2022. @@day@@ | Day in spoken form.<br/><br/> For example, Wednesday.  @@month@@| Month in spoken form. <br/><br/> For example, January.  @@hrs@@| Current hour with leading zero, in 24 hour format.<br/><br/> For example, 16.  @@min@@ | Current minute with leading zero.<br/><br/> For example, 45.  @@date@ | Current date in format (yyyy-mm-dd)<br/><br/> For example, 2022-02-02. @@time@@| Current time in 24-hour format. <br/><br/>For example, 16:37.    * * *  #### Custom Tags  Using message attributes and message Templates allows developers to cleanly separate these responsibilities. This is done by combining the message channels being used for the message and the data driving the message. Under the operational point of view this solution is achieved with two steps: 1. Creating a Template including attributes 2. Using the Template and replacing the values for the attributes  Whispir’s API customers can simplify their requests by using the message attributes directly from the API. Using message attributes allows to achieve flexibility in the communications. With this solution, Developers just need to take care of the data behind a message while the Marketing team can focus on the presentation or messaging channels within the message. > Unlike native tags, user-defined attributes require Whispir administrative assistance to enable and are configured at the account level. Please contact your Whispir account manager or the [Whispir Support Team](mailto=\'support@whispir.com\') if interested in using them. Whispir’s API only accepts message attributes containing alpha-numeric ASCII characters. We are about to see a full example where an initial fixed message has been adapted to be reusable.  **Without Custom Tags**  ```JSON POST http://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+json Accept: application/vnd.whispir.message-v1+json   {    \"to\" : \"jsmith@test.com\",     \"subject\" : \"Reminder\",     \"body\" : \"Your invitation to the Acme Event will expire on 13/06/2019 at 23:59:59\",     \"email\" : {        \"type\" : \"text/plain\",        \"body\" : \"Your invitation to the Acme Event will expire on 13/06/2019 at 23:59:59\"     } } ``` ```XML POST http://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+xml Accept: application/vnd.whispir.message-v1+xml   <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <ns2:message xmlns:ns2=\"http://schemas.api.whispir.com\">     <to>jsmith@test.com</to>     <subject>Reminder</subject>     <body>Your invitation to the Acme Event will expire on 13/06/2019 at 23:59:59</body>     <email>         <type>text/plain</type>         <body>Your invitation to the Acme Event will expire on 13/06/2019 at 23:59:59</body>     </email> </ns2:message> ```  **With Custom Tags**  #### Using Message Variables in Templates  ```JSON Step 1 - Creating a Template including the attributes POST http://api.<region>.whispir.com/workspaces/{workspaceId}/templates   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.template-v1+json Accept: application/vnd.whispir.template-v1+json    {     \"messageTemplateName\" : \"Event Reminder\",     \"subject\" : \"Reminder:\",     \"body\" : \"Your invitation to the Acme Event will expire on @@event_expiry@@ at @@event_expiry_time@@\",     \"email\" : {        \"type\" : \"text/plain\",        \"body\" : \"Your invitation to the Acme Event will expire on @@event_expiry@@.\"     } } Response - template created 201 - Created Location: http://api.<region>.whispir.com/workspaces/{workspaceId}/templates/DACADB02209CC93C {     ...    \"id\": \"DACADB02209CC93C\",     ... } Step 2 - Using Template including attributes to send the message POST http://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+json Accept: application/vnd.whispir.message-v1+json   {     \"to\" : \"jsmith@test.com\",     \"messageTemplateId\" : \"DACADB02209CC93C\",     \"messageattributes\" : {       \"attribute\" : [{          \"name\" : \"event_expiry\",               \"value\" : \"13/06/2019\"          },{          \"name\" : \"event_expiry_time\",               \"value\" : \"23:59:59\"          }]    }  } ``` ```XML Step 1 - Creating a Template including attributes POST http://api.<region>.whispir.com/workspaces/{workspaceId}/templates   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.template-v1+xml Accept: application/vnd.whispir.template-v1+xml   <?xml version=\"1.0\" encoding=\"UTF-8\"?> <ns3:template xmlns:ns3=\"http://schemas.api.whispir.com\"                xmlns:ns2=\"http://schemas.api.whispir.com/dap\">   <messageTemplateName>Event Reminder</messageTemplateName>   <subject>Reminder</subject>   <body>Your invitation to the Acme Event will expire on @@event_expiry@@ at @@event_expiry_time@@</body>   <email>      <type>text/plain</type>      <body>Your invitation to the Acme Event will expire on @@event_expiry@@ at @@event_expiry_time@@</body>   </email> </ns3:template> Response - template created 201 - Created Location: http://api.<region>.whispir.com/workspaces/{workspaceId}/templates/DACADB02209CC93C <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <ns3:template xmlns:ns2=\"http://schemas.api.whispir.com/dap\" xmlns:ns3=\"http://schemas.api.whispir.com\">     ...     <id>DACADB02209CC93C</id>     ... <ns3:template> Step 2 - Using Template including attributes to send the message POST http://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+xml Accept: application/vnd.whispir.message-v1+xml   <?xml version=\"1.0\" encoding=\"UTF-8\"?> <ns3:template xmlns:ns3=\"http://schemas.api.whispir.com\"                xmlns:ns2=\"http://schemas.api.whispir.com/dap\">    <to>jsmith@test.com</to>    <messageTemplateId>DACADB02209CC93C</messageTemplateId>    <messageattributes>       <attribute>          <element>             <name>@@event_expiry@@</name>             <value>13/06/2019</value>          </element>          <element>             <name>@@event_expiry_time@@</name>             <value>23:59:59</value>          </element>       </attribute>    </messageattributes> <ns3:template> ``` Using this message template ID and now using the message attribute @@event_expiry@@, the updated code example (combining the message template and message attribute) is far simpler to implement and is more efficient.  * * *  ### Scheduled Messages  #### Timezone - Scheduling rules  Using the Whispir API you can schedule messages to be sent later, both once or repeatedly with the possibility to specify the interval between the sessions. The service is available for SMS, email, voice, rich messages  A message is scheduled according to the timezone set in the Whispir account of the user who initiates the message request. This setting can be found in the Whispir Portal under \"Settings\"->\"User Manager\"->\"View/Edit\". Whispir DOES NOT honor the timezone where the sender or the message recipient are currently located in For example if the user’s time zone is set to UTC in their Whispir profile then messages are scheduled to be sent as per UTC, even if the user triggers the message while sitting in Singapore (+8). So please ensure that any scheduled communication is sent at the appropriate/preferred time Also, changing the user\'s timezone setting after the message is triggered DOES NOT change the original scheduled time.  #### Sending messages at a later date  ```JSON POST https://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+json Accept: application/vnd.whispir.message-v1+json ONCE In this sample we will schedule a single message to be delivered at 3:55pm on 14 February 2019 {     \"to\" : \"jsmith@test.com\",     \"subject\" : \"Test scheduled email message\",     \"email\" : {         \"body\" : \"This is my scheduled content\",         \"type\" : \"text/plain\"     },     \"messageType\" : \"SCHEDULED\",     \"scheduleType\" : \"ONCE\",     \"scheduleDate\" : \"14/02/2019 15:55\" } REPEAT In this sample we will will schedule 10 messages to be delivered every hour starting from 3:55pm on 14 February 2019 {     \"to\" : \"jsmith@test.com\",     \"subject\" : \"Test scheduled email message\",     \"email\" : {         \"body\" : \"This is my scheduled content\",         \"type\" : \"text/plain\"     },     \"messageType\" : \"SCHEDULED\",     \"scheduleType\" : \"REPEAT\",     \"scheduleDate\" : \"14/02/2019 15:55\",     \"repetitionCount\" : \"10\",     \"repeatDays\" : \"0\",     \"repeatHrs\" : \"1\",     \"repeatMin\" : \"0\" } ``` ```XML POST https://api.<region>.whispir.com/workspaces/{workspaceId}/messages   Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk x-api-key: your_api_key Content-Type: application/vnd.whispir.message-v1+json Accept: application/vnd.whispir.message-v1+json ONCE In this sample we will schedule a single message to be delivered at 3:55pm on 14 February 2019 <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <ns2:message xmlns:ns2=\"http://schemas.api.whispir.com\" xmlns:ns3=\"http://schemas.api.whispir.com/dap\">     <to>john.smith@test.com</to>     <subject>Test scheduled email message</subject>     <email>         <body>This is my scheduled content</body>         <type>text/plain</type>     </email>     <messageType>SCHEDULED</messageType>     <scheduleType>ONCE</scheduleType>     <scheduleDate>14/02/2019 15:55</scheduleDate> </ns2:message> REPEAT In this sample we will will schedule 10 messages to be delivered every hour starting from 3:55pm on 14 February 2019 <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <ns2:message xmlns:ns2=\"http://schemas.api.whispir.com\" xmlns:ns3=\"http://schemas.api.whispir.com/dap\">     <to>john.smith@test.com</to>     <subject>Test scheduled email message</subject>     <email>         <body>This is my scheduled content</body>         <type>text/plain</type>     </email>     <messageType>SCHEDULED</messageType>     <scheduleType>REPEAT</scheduleType>     <scheduleDate>14/02/2019 15:55</scheduleDate>     <repetitionCount>10</repetitionCount>     <repeatDays>0</repeatDays>     <repeatHrs>1</repeatHrs>     <repeatMin>0</repeatMin> </ns2:message> ```
     * @summary Send a message
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param contentType Application specific mime-type.
     * @param accept Application specific mime-type.
     * @param message Message object needed to create message. At least one of the Body fields must be populated [SMS, email, voice or web].
     */
    create(params?: MessageCreateParams, options?: RequestOptions): Promise<CreateResponse<Message>>;
    /**
     * List all sent messages for the workspace.  Pagination is available.
     * @summary List messages
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     */
    list(params?: MessageListParams, options?: RequestOptions): Promise<ApiResponse<MessageCollection>>;
    /**
     * ## Summary Responses  Using the links provided in the message response, the user can simply make a new API request to retrieve the summaryStatus URL.  The request for this information would look as follows:  `GET /messages/069BF68E5E0FE99B/messagestatus?view=summary`  This request is asking for a couple of things:  1.  The URL is specifically asking for all of the **messageresponses** to the message with ID **069BF68E5E0FE99B**  3.  The **View** parameter is specifying that the message responses should be shown in a **summary** view  5.  The **Filter** parameter is specifying that the filter should not use a response rule, it should show the **default** filter  As this is a **GET** request we don’t have to provide any message body.  This response states that of the 2 people that were sent the message, both of them **Acknowledged** it by sending a response.  Your application can use this information to easily determine the numbers of recipients in each state and show a small graph.  ## Detailed Responses Using the links provided in the message response, the user can simply make a new API request to retrieve the detailedResponses URL.  The resulting request would look as follows:  `GET /messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=default`  This request is asking for a couple of things:  1.  The URL is specifically asking for all of the **messageresponses** to the message with ID `069BF68E5E0FE99B` 2.  The **View** parameter is specifying that the message responses should be shown in a **detailed** view 3.  The **Filter** parameter is specifying that the filter should not use a response rule, it should show the **default** filter  As this is a **GET** request we don’t have to provide any message body.  **Note**:Searching responses will be described further on in this documentation.  *   The **responseMessage channel** describes the messaging channel that the response has come in to the Whispir Platform via.  *   The **responseMessage content** describes the actual content of the inbound message.  *   The **responseMessage acknowledged** shows the date of when the response was received by the Whispir Platform
     * @summary List responses for a sent message
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param messageId Enter message id
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     * @param view The view for the message response.
     * @param filter The filter for the message response.
     */
    listMessageResponse(params?: MessageResponseListParams, options?: RequestOptions): Promise<ApiResponse<MessageResponseCollection>>;
    /**
     * Each of the URLs specified in the response can be accessed using the REL and appropriate METHOD to perform the specified functionality.  **Rel Attribute Descriptions**  * * *  - **self:** Retrieves the current message.    - **summaryStatus:** Returns the status information of the message as a messagestatus object, in a summary view.    - **detailedStatus:** Returns the status information of the message as a messagestatus object, in a detailed view.    - **summaryResponses:** Returns the response information of the message as a messageresponse object, in a summary view.    - **detailedResponses:** Returns the response information of the message as a messageresponse object, in a detailed view.   - **summaryResponsesWithResponseRule:** Returns the response information of the message as a messageresponse object, filtered by the Response Rule (if one was used) in a summary view.    - **detailedResponsesWithResponseRule:** Returns the response information of the message as a messageresponse object, filtered by the Response Rule (if one was used) in a detailed view.
     * @summary Retrieve a message
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param messageId The identifier for the message.
     */
    retrieve(params?: MessageRetrieveParams, options?: RequestOptions): Promise<ApiResponse<Message>>;
    /**
     * Whispir will automatically monitor the status of each message after it has been sent to each recipient. Using the message status information, you are able to determine who received the message, what exact time they received it, on what message channel (SMS, Email, Voice, Web, Push Notification), whether they replied to the message, what time they replied, and on what messaging channel.       Each message progresses through various states, from Pending to Acknowledged.   ### Message Status Descriptions  - **Pending (PENDING):** The message has not yet been processed by Whispir. It is in a queue and will be processed shortly. - **Sent (SENT):** The message has been sent from Whispir to the recipient, however, there has been no acknowledgement from the recipient via read receipt that the message has arrived. - **Received (DELIVRD):**   - **Email:** Whispir has received acknowledgement via a read receipt that the message has arrived in the inbox.   - **SMS:** Received status can mean one of two things for SMS.     1.  The message has been received by the network and is being processed for delivery to the handset.           How long the message stays in this state is up to the telco.     2.  The message has been received by the handset and confirmed by the telco. - **Acknowledged (READ):** Whispir has received an intended response from the recipient, either by reply SMS, Email or Voice prompt - **Undeliverable (FAILED):** Whispir was not able to deliver the message to the intended recipient on the specified channel. This may be due to incorrect information e.g. wrong phone number or email address, or due to poor network coverage.  Using the API, developers are able to access this status information at either a Summary or Detailed level.  The first thing a developer must do in order to retrieve the status of a sent message is retrieve the message using the API.  ### Retrieve Summary Status  Using the links provided in the message response, the user can simply make a new API request to retrieve the summaryStatus URL.  In the example above, the summaryStatus URL is:  So the request would look as follows:  `GET /messages/069BF68E5E0FE99B/messagestatus?view=summary`  As this is a GET request we don’t have to provide any message body.  This response states that of the 2 people that were sent the message, both of them Acknowledged it by sending a response.  Your application can use this information to easily determine the numbers of recipients in each state and show a small graph.  ### Retrieve Detailed Status  Similar to the summaryStatus, using the links provided in the message response, the user can simply make a new API request to retrieve the detailedStatus URL.  `GET /messages/069BF68E5E0FE99B/messagestatus?view=detailed`  As this is a GET request we don’t have to provide any message body.  The user can easily use this information to receive a far more detailed status breakdown of (for each recipient):  *   The name of the recipient *   The channel type (SMS, Email, Voice, Web) *   The sent timestamp for each channel *   The received timestamp for each channel *   The acknowledged timestamp for each channel *   The undeliverable timestamp (only present when the channel is undeliverable) *   The overall status for this recipient (PENDING, SENT, DELIVRD, READ, FAILED) *   The information text describing how this message has progressed.  Once you have processed the status information, the next likely piece of information you will be looking to find is the content of the responses (if any). The section on Message Responses describes how to retrieve this information.
     * @summary List message status for a sent message
     * @param workspaceId The identifier for the workspace.
     * @param xApiKey The API key for authentication.
     * @param accept Application specific mime-type.
     * @param messageId Enter message id
     * @param limit The number of records to be returned.
     * @param offset The record number to start returning from.
     * @param sortOrder The order in which you require the results to be returned. Either ‘asc’ or ‘desc’
     * @param sortFields The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
     * @param view The view for the message status.
     * @param filter The filter for the message status.
     */
    listMessageStatus(params?: MessageStatusListParams, options?: RequestOptions): Promise<ApiResponse<MessageStatusCollection>>;
}
export {};

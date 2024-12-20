/// <reference types="node" />
/// <reference types="node" />
import localVarRequest from 'request';
export * from './activity';
export * from './activityCollection';
export * from './aliasOption';
export * from './apiError';
export * from './apns';
export * from './attachment';
export * from './attachments';
export * from './auth';
export * from './callback';
export * from './callbackAuth';
export * from './callbackCall';
export * from './callbackCallCollection';
export * from './callbackCollection';
export * from './callbackInvocation';
export * from './callbackOptions';
export * from './channel';
export * from './contact';
export * from './contactCollection';
export * from './customList';
export * from './customListCollection';
export * from './deliveryCategory';
export * from './deliveryReceipt';
export * from './deliveryStatus';
export * from './distributionList';
export * from './distributionListCollection';
export * from './distributionListContacts';
export * from './email';
export * from './event';
export * from './eventCollection';
export * from './fcm';
export * from './features';
export * from './fieldMapping';
export * from './form';
export * from './formField';
export * from './import';
export * from './link';
export * from './listLabel';
export * from './location';
export * from './message';
export * from './messageCollection';
export * from './messageResponseCollection';
export * from './messageResponseDetailed';
export * from './messageResponseSummary';
export * from './messageStatus';
export * from './messageStatusCollection';
export * from './messagingOption';
export * from './pushOptions';
export * from './resource';
export * from './resourceCollection';
export * from './responder';
export * from './response';
export * from './responseRule';
export * from './responseRuleCollection';
export * from './responseStatusDetailed';
export * from './responseStatusSummary';
export * from './scenario';
export * from './scenarioCollection';
export * from './social';
export * from './template';
export * from './templateCollection';
export * from './templatePattern';
export * from './user';
export * from './userCollection';
export * from './voice';
export * from './web';
export * from './workspace';
export * from './workspaceCollection';
import * as fs from 'fs';
export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    };
}
export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);

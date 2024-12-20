export * from './api/apis';
export * from './model/models';
import { Interceptor } from './model/models';
import { ActivitiesApi } from './api/activitiesApi';
import { AuthApi } from './api/authApi';
import { CallbacksApi } from './api/callbacksApi';
import { ContactsApi } from './api/contactsApi';
import { CustomListsApi } from './api/customListsApi';
import { DistributionListsApi } from './api/distributionListsApi';
import { EventsApi } from './api/eventsApi';
import { ImportsApi } from './api/importsApi';
import { KeysApi } from './api/keysApi';
import { MessagesApi } from './api/messagesApi';
import { ResourcesApi } from './api/resourcesApi';
import { ResponseRulesApi } from './api/responseRulesApi';
import { ScenariosApi } from './api/scenariosApi';
import { TemplatesApi } from './api/templatesApi';
import { UsersApi } from './api/usersApi';
import { WorkspacesApi } from './api/workspacesApi';
export type ClientConfig = {
    host: string;
    username?: string;
    password?: string;
    apiKey?: string;
    accessToken?: string;
};
declare const Client: (config: ClientConfig) => {
    activities: ActivitiesApi;
    auth: AuthApi;
    callbacks: CallbacksApi;
    contacts: ContactsApi;
    customLists: CustomListsApi;
    distributionLists: DistributionListsApi;
    events: EventsApi;
    imports: ImportsApi;
    keys: KeysApi;
    messages: MessagesApi;
    resources: ResourcesApi;
    responseRules: ResponseRulesApi;
    scenarios: ScenariosApi;
    templates: TemplatesApi;
    users: UsersApi;
    workspaces: WorkspacesApi;
    addInterceptor: (interceptor: Interceptor) => void;
};
export default Client;

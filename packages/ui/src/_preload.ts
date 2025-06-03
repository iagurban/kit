import { requestRefreshAuthToken } from './requests/request-refresh-auth-token';

window.__initialAccessToken = requestRefreshAuthToken().catch(() => null);

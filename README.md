# simple-axios-tk

## Description
This a example use `axios` to call api server and auto refresh token when `access token`  is about to expire

### Access tokens
Access tokens are issued to third-party clients by an authorization server with the approval of the resource owner. The client uses the access token to access the protected resources hosted by the resource server.

### Refresh tokens
Refresh Tokens are credentials used to obtain access tokens. Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires, or to obtain additional access tokens with identical or narrower scope.

### What is the purpose of a "Refresh Token"?
There is a security reason, the refresh_token is only ever exchanged with authorization server whereas the access_token is exchanged with resource servers. This mitigates the risk of a long-lived access_token leaking in the "an access token good for an hour, with a refresh token good for a year or good-till-revoked" vs "an access token good-till-revoked without a refresh token."
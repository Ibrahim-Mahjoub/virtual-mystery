This document is an overview of virtual mystery's authentication features. It is split up between django and angular.

## DJANGO

**NOTE: _Ensure that the API is used only over HTTPS during production._**

### Overview
Django uses the django-rest-framework's token authentication through api endpoints (see authentication app README file for more info).

### Tokens (models.py: create_auth_token function)
64 hex-character tokens which do not expire in a given time interval and must be manually reset. A token is automatically created for new users using the post_save signal. 

### Authentication
For users to authenticate when making a request, the token key should be included in the HTTP request header as follows: `Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`. Note that the word `Token` must preceed the token key followed by a space.

### Login (views.py: Login class)
A login is executed by verifying the user credentials (username and password) and returning a token as well as any additional information, if the verification is successful. Note that a token is created if no token exists.

### Logout (views.py: Logout class)
A logout is executed by deleting the users' token thereby forcing the user to login for any further requests. This requires the user making the request to be authenticated. 


## ANGULAR

**NOTE: _For endpoint info see django authentication app README file._**

### Backend Communication (auth: auth.service)
Initiates http requests to specific endpoints in the django backend.

### Storage
The authentication token is stored in sessionStorage in the `currentUser` object under the `token` attribute.

### Requests (auth: http.service)
Any requests sent to django endpoints from an authenticated user automatically have the users' authentication token key appended in the request header.

### Responses (auth: auth.interceptor)
If any request returns an `HTTP 401 UNAUTHORIZED` response, the `currentUser` object is deleted if exists and the user is redirected back to the login page. 

### Login (auth: login file)
Sends an HTTP request with the user credentials (username and password) to the django login endpoint and on a successful response, creates a 'currentUser' object which stores the 'token' key.

### Logout (auth: logout file)
Sends an HTTP request to the django logout endpoint and on a successful response, deletes the `currentUser` object and the user is redirected back to the login page. 

### Status (auth: auth.service)
The function `getUser` is used to check the authentication status of a user by checking whether the `currentUser` object exists in sessionStorage.

### Auth Guard (auth: auth-guard.service)
Restricts routes that require the user to be logged in by checking the auth.service `getUser` function.

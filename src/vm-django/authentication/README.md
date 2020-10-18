# Authentication Framework

Notes:
 - Logout request requires an authentication token in the header
 - Uses django-rest-framework token authentication
 - Token does not expire at a given time interval
 - Token is reset for each user once the user logs out

## Login

### Definition
Get a user's auth token and information on valid login.

**Note: _New auth token is created if one doesn't exist._**

### Request

`POST /auth/token`

**JSON:**
```
 [
     {
	"username": username,
	"password": password
     }
 ]
```

### Response
- `200 OK` on success
- `400 BAD REQUEST` on failure

**JSON:**
```
 [
     {
	"token": authtoken,
	"release": currentreleasenumber
     }
 ]
```

## Logout

### Definition
Log user out by deleting auth token.

### Request
`GET /auth/logout`

### Response
- `200 OK` on success
- `400 BAD REQUEST` on failure

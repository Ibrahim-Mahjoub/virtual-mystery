# Mystery Framework

**NOTE: _All of these requests require an authentication token in the header._**

## ReleaseList

### Definition

Get a list of release data ordered by release number upto and including the current release.

### Request

`GET /mystery/release/list`

### Response

- `200 OK` on success
- `400 BAD REQUEST` on failure

**JSON:**
```
 [
     {
        "commented": boolean,
        "number": releasenumber
     }
 ]
```

## Artifact

### Definition

Get information on the artifact for the requested release. 

### Request

`GET /mystery/release/<release#>`

### Response

- `200 OK` on success
- `400 BAD REQUEST` on failure

**JSON:**
```
 [
     {
        "clue": cluetext,
        "hash": releasehash,
	"mystery_hash": mysteryhash
     }
 ]
```

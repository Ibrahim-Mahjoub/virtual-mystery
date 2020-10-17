This document is an overview of virtual mystery's mystery features. It is split up between django and angular.

## DJANGO

### Mystery (mystery: models.py)
The mystery model acts as a template for mysteries. Attributes include:

- `name` - mystery name
- `hash` - mystery hash (used for static file paths)
 
### Instance  (mystery: models.py)
The instance model connects a mystery to a group, since multiple groups can have the same mystery. Attributes include:

- `mystery` - mystery (refers to mystery model)
- `group` - system group (refers to group model)

### Release  (mystery: models.py)
The release model holds mystery specific release information in the backend. Attributes include:

- `mystery` - mystery (refers to mystery model)
- `number` - release number (positive integer, mystery release ordering)
- `clue` - release clue text (no character limit)
- `answer` - release answer text (no character limit)
- `hash`  release hash (property - used for static file paths)

### Mystery Hash (mystery: models.py)
SHA256 hash of the mystery name.

### Release Hash (mystery: models.py)
SHA256 hash of the release id, which is auto incremented from 1.

### Release Serializer (mystery: serializers.py)
Converts release objects into JSON data (serializes):

- `number` - release number
- `commented` - boolean (true iff user has commented on release, otherwise false)

### Artifact Serializer (mystery: serializers.py)
Converts release objects and related mystery object data into JSON data (serializes):

- `clue` - release clue text
- `hash` - release hash
- `mystery_hash` - mystery hash

### Timed Release (release.py & VM_DJANGO: settings.py)
Configured in main settings file:

- `DATETIME_FORMAT` - format for the `START_DATETIME` setting
- `START_DATETIME` - the datetime for the first release
- `RELEASE_INTERVAL` - interval between releases

The `get_current_release` function returns 0 iff the `START_DATETIME` has not yet been reached, otherwise returns the current release number. Note that times are calculated in the timezone set in the main settings file.
 

### List Releases (mystery: views.py)
When requesting an ordered list of releases through the list release endpoint, a check is done to ensure that the mystery start date has been reached. If passed, certain attributes are derived from the authenticated user:

- `mystery` - the authenticated groups' assigned mystery (through instance)

and an organized list of releases less than or equal to the current release are returned in the response.  

### Artifact (mystery: views.py)
When requesting artifact data for a specific release through the artifact endpoint, a check is done to ensure that the requested release date has been reached. If passed, certain attributes are derived from the authenticated user:

- `mystery` - the authenticated groups' assigned mystery (through instance)
 
and a list of artifact info for the requested release is returned in the reaponse.

## ANGULAR

### Backend Communication (mystery: mystery.service)
Initiates http requests to specific endpoints in the django backend. Called from other components.

### Current Release (mystery: mystery.service)
Stored in the `currentUser` object in release attribute. Initialized during login and updated in the releaselist component. 

### List Releases (mystery: releaselist component)
Releases are listed in order of increasing release number. If a user commented on a release, it is dislayed in green, otherwise it is displayed in red. Current release in currentUser is updated iff a change is detected from the backend.

### View Releases (mystery: releaseview component)
Container for the comment component and artifactview component. Selected release is passed in through the url. Previous release button is disabled iff the currently selected release is 1. Next release button is disabled iff the currently selected release is the current release.


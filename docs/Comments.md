This document is an overview of virtual mystery's comment features. It is split up between django and angular.

## DJANGO
 
**NOTE: _Uses a custom made solution which is contained within the comments app._**

### Overview
Commenting in virtual mystery is based on the following rules:
1. Users can only post one comment per-release
2. Users can only post comments in their current release
3. Users can only reply to comments (ie. maximum depth of 1)
4. Users can only view comments for the current release once they have commented
5. Comments are specific to their owner, instance and release

### Comment (comments: models.py)
Attributes include:
- `created` - datetime created (auto generated)
- `owner` - user (refers to user model)
- `instance` - mystery instance (refers to instance model)
- `release` - mystery release (positive integers)
- `text` - comment text (no character limit)

### Reply (comments: models.py)
Attributes include:
- `created` - datetime created (auto generated)
- `owner` - user (refers to user model)
- `text` - reply text (no character limit)
- `parent` - parent comment (refers to comment model)

### Ordering (models.py: meta class)
Comments and replies are ordered by datetime created (ie. first comment/reply comes first, etc...).

### Comment Serializer (serializers.py: CommentSerializer class)
Converts comment objects into JSON format (serializes): 

- `id` - comment id (used for replying)
- `username` - comment owner username
- `reply` - organized list of reply objects for the comment
- `text` - comment text

and creates comment objects from JSON data (deserializes):
	
- `owner` - user that created the comment
- `instance` - mystery instance
- `release` - mystery release number 
- `text` - comment text

serializer and deserializer fields are specified in the read_only and write_only meta class attributes.

### Reply Serializer (serializers.py: ReplySerializer class)
Converts reply objects into JSON format (serializes):

- `id`- reply id
- `username` - reply owner username
- `text` - reply text

and creates reply objects from JSON data (deserializes):

- `owner` - user that created the reply
- `parent` - parent comment that was replied to
- `text` - reply text

serializer and deserializer fields are specified in the read_only and write_only meta class attributes.

### Create Comment  (views.py: CommentCreate class)
When creating a comment through the comment create endpoint, checks are performed to ensure that the mystery start date has been reached and that the user has not previously commented on the current release. If both checks are passed, certain attributes are derived from the authenticated user:

- `release` - the current release
- `owner` - the authenticated user
- `instance` - the authenticated user's instance

and the comment is successfully created.

### Create Reply  (views.py: ReplyCreate class)
When creating a reply to a comment through the reply create endpoint, a check is performed to ensure that the user's instance contains a comment with the same id as the one submitted with the request. If passed, certain attributes are derived from the authenticated user:

- `owner` - the authenticated user
- `instance` - the authenticated user's instance

and the reply is successfully created and returned in the response. 

### List Comments (views.py: CommentList class)
When requesting an ordered list of comments and replies for a specific release through the comment list endpoint, a check is done to ensure that the user has already commented on the release or that the release number is less than that of the current release. If passed, certain attributes are derived from the authenticated user:

- `instance` - the authenticated user's instance

and the list of comments/replies is returned in the response.


## ANGULAR

**NOTE: _For endpoint info see django comments app README file._**

### Backend Communication (comment: comment.service)
Initiates http requests to specific endpoints in the django backend. Called from other components.

### Create Comment  (comment: commentcreate component)
The release value is mainly used within this component to indicate a comment component input change. Once a change is detected or once the user submits a comment, the comment list component is displayed.  

### List Comments (comment: commentlist component)
On release initialization or change, this component should be displayed first. Displays comments in the order in which they arrive. Replies can be toggled (default hidden). 

### Create Reply (commentlist: replycreate component)
Used as a nested component in the comment list component. When a reply is successfully created, the returned reply info is passed on to the comment list component for display. 

### Current Release (comment: comment.service)
An observable communicates to the comment components the release that is currently selected, which is inputted and set through the main comment component.

### Show Comments (comment: comment.service)
A `showComments` boolean variable (defaults to true) is used to toggle between displaying the comment create and comment list components within the main comment component. If true, comment list component is displayed, otherwise, comment create component is displayed. 

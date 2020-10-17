This document is an overview of virtual mystery's system features. It is split up between django and angular.

## DJANGO

### Overview
System models make up the main structure for the virtual mystery application.

### User (system: models.py)
Custom user model. Inherits from default django user class:

- default user class attributes
- group: users' group (refers to group model)

### Group (system: models.py)
Referred to by multiple users:

- name: group name (no character limit)
- practical: groups' practical (refers to practical model)

### Practical (system: models.py)
Referred to by multiple groups. Used for TA/Instructor:

- To Be Implemented

### Forms (system: forms.py)
Contains custom user creation and change forms for admin site. Inherits from default user forms. 

### Admin (system: admin.py)
Custom user admin class. Inherits default user admin class. Adds custom user fields to the admin site and forms. 


## ANGULAR

### 404 Page Not Found (not-found.component)
Single file component. Template contained in file. Used to catch invalid urls.

### Router (app-routing: app-routing.module)
Routes are checked in order from top down. Make sure that `**` route is last, to catch any invalid routes. canActivate is used to implement route guards on certain routes. runGuardsAndResolvers is used to specify when to run route guards and resolvers mainly while re-routing to the same route. onSameUrlNavigation is used to specify an action when routing to the same route.

### Main Component (app.component)
Acts as a container for other components. Contains the main header and menu. Logout component is nested inside.

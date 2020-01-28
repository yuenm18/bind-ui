# BIND UI

A simple web client for BIND.

![Screenshot of Home Page](images/home-page.jpg)

**Notes:**
1. Currently firebase is used for storing user credentials.
2. It's best to start with a fresh zone file since the parser is not very sophisticated.


## Installation

1. Ensure *named-checkzone* and *rndc* are installed and can be run by the user who will be running the webserver. (The user usually has to belong to this *bind* group)
```
named-checkzone $ORIGIN $ZONE_FILE
rndc reload
```
2. Ensure that the user who will be running the webserver can read and write the zone file
3. Add *.env* file to the root directory of this repository with the following properties
```
ZONE_FILE=<zone-file-location>
ORIGIN=<origin>
SECRET=<session-secret>
FIREBASE_API_KEY=<api-key>
FIREBASE_PROJECT_ID=<project-id>
```
4. Run `npm install && npm run build`
5. Run `npm run install`

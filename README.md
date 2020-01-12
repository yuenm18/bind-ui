# Bind UI

## Installation

1. Ensure *named-checkzone* and *rndc* are installed and can be run by the user who will be running the webserver (user usually has to belong to this *bind* group)
```
named-checkzone $ORIGIN  $ZONE_FILE
rndc reload
```
2. Ensure that the user who will be running the webserver can read and write the zone file
3. Add *.env* file to the root directory of this repository with the following properties
```
ZONE_FILE=<bind-file-location>
ORIGIN=<origin>
TTL=<ttl>
SECRET=<session-secret>
FIREBASE_API_KEY=<api-key>
FIREBASE_PROJECT_ID=<project-id>
```

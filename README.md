# BIND UI

A simple web client for BIND.

![Screenshot of Home Page](images/home-page.jpg)

**Notes:**
1. This only supports A, AAAA, CNAME, NS, and TXT records
2. It's best to start with a fresh zone file since the parser is not very sophisticated.
3. A firebase account is needed for storing user credentials.

## Installation

### Server

1. Ensure at least node 10 and npm are installed
2. Ensure *named-checkzone* and *rndc* are installed and can be run by the user who will be running the webserver. (The user usually has to belong to this *bind* group)
```
named-checkzone $ORIGIN $ZONE_FILE
rndc reload
```
3. Ensure that the user who will be running the webserver can read and write the zone file
4. Add *.env* file to the root directory of this repository with the following properties
```
ZONE_FILE=<zone-file-location>
ORIGIN=<origin>
SECRET=<session-secret>
FIREBASE_API_KEY=<api-key>
FIREBASE_PROJECT_ID=<project-id>
```
5. Run `npm install && npm run build`
6. Run `npm run pm2-install` and navigate to [http://localhost:3001](http://localhost:3001)

### Docker

This project can be run in docker if BIND is not installed locally.

1. Ensure docker is installed
2. Add an *.env* file to the root directory of the repository with the same properties specified in the [server](###Server) section
3. Run `docker-compose up`

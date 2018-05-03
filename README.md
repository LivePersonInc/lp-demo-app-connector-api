# lp-demo-app-connector-api
Demo conversation app for connector Api 
### Introduction
This project is a NodeJS app integrated with an Angular_cli generated project, this means: the default configuration has been changed in order to integrate Angular with NodeJS.
### Requirements. 
- Node 6.9.0 or higher, together with NPM 3 or higher.
- Angular CLI 1.7.3 or higher.
#### Project structure
- Server: NodeJS server used as notification server (receive webhooks notifications and map it to the correct conversation).
The serves is also used as a brige to avoid CORS problems in the browser.
- Web app: Angular 5 project. The user can open a conversation
### How to run
1. ```npm install```
2. ```ng build --prod```  to build a compiled version.
3. ``sudo node app`` to run the server.
4. Open ``` http://localhost:8282``` in your browser.

#### Development Mode:

Angular CLI provides a fast develoment server. Every change is automatically refreshed in the browser.

To run the application using the dev server instead a built project:

1. ```npm install```
2. ```sudo node app``` to run the server
2. ```ng serve``` to run web develpment server
4. open ``` http://localhost:4200``` in your browser. All changes in the web folder would be reflected immediately

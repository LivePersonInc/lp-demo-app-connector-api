# Demo App for connector API

This project is a NodeJS app integrated with an Angular_cli generated project, this means: the default configuration has been changed in order to integrate Angular with NodeJS.

## Requirements. 

- Node 6.9.0 or higher, together with NPM 3 or higher.
- Angular CLI 1.7.3 or higher. Download here: https://cli.angular.io/
- Your server must be accessible if you want to receive events from webhooks. Or you can use a tool to redirect all the notifications from outside to your internal network.

## Run:
1. ```npm install``` 
2. ```sudo npm start```
3. Open ``` http://localhost:8282``` in your browser. 
4. Login with your account(By default it does not work with QA accounts, you need to change the CSDS domain property)


## Run with docker:

1. Create the image ```docker build -t demo-connector-app .```
2. Create the image ```docker run -p 443:443 -d demo-connector-app ```
3. Open ``` https://localhost``` in your browser.

## Project structure

- Server: NodeJS server used as notification server (receive webhooks notifications and map it to the correct conversation).
The server is also used as a bridge to avoid Cross-Domain restrictions in the browser.
- Web app: Angular 5 project.(Its possible to open a new chat conversation for a random consumer using your brand credentials).

## Settings
Before running or deployment it is necessary to setup some configuration parameters:
- settings.json:
  1. [CSDS_DOMAIN] : The domain of the service to get the rest of domains. (Production csds domain by default)
  1. [SERVER_HTTP_PORT] : The port of the server listening for webhooks notifications. NOTE: The server is running in http and
  https, if u are using https the port cant be changed (443).
### Webhooks Setup 
In your app installation you need to add this webhook listener server url:<br/>  You can add this after login in the configuration webhooks page.

``https://{your server domain or ip}/notifications/event``


### Development Mode:

Angular CLI provides a fast development server using Webpack. Every change is automatically refreshed in the browser.

To run the application using the dev server instead a built project:

1. ```npm install```
2. ```sudo node app``` to run the server
2. ```ng serve``` to run web development server
4. open ``` http://localhost:4200``` in your browser. All changes in the web folder would be reflected immediately


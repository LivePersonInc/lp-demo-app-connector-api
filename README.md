# Demo App for connector API

This project contains a demo app for connector api that can create a conversation within a consumer and an agent. 
You can send messages and events with it as well as 
visualize the incoming event notifications.

see: [Connector API first steps](https://developers.liveperson.com/connector-api-first-steps-overview.html)

---

`Important!`

This app ONLY should be used with TEST ACCOUNTS, it could compromise your sensitive data. Since this app is no using
any data base, sensitive data is saved in your browser local storage. (this will be changed in the future).

## Table of Contents
  - [Requirements](#requirements)
  - [hoe to run](#how-to-run)
  - [Run NgRok](#run-ngrok)
  - [Configure webhooks endpints](#configure-webhooks-endpoints)
  - [How to use](#how-to-use)
  - [Run with docker](#run-with-docker)
  - [Project structure](#project-structure)
  - [Settings](#settings)
  - [Webhooks Setup](#webhooks-setup)
  - [Development Mode](#development-mode)
  - [Send and handle conversation events](#send-snd-handle-conversation-events)

## Requirements.

- Node 6.9.0 or higher, together with NPM 3 or higher.
- [Angular CLI](https://cli.angular.io/) 1.7.3 or higher. 
- A valid brandID with Async prop Messaging enabled.
- An installed APP for your brandID with the data sources configured in LiveEngage. 
- Your server must be accessible if you want to receive events from webhooks. Or you can use a tool to redirect all the
 notifications from outside to your internal network.
  * (optional). Use [NgRok](https://ngrok.com/) for redirecting the webhooks notification from internet to your local host.
  Run it with the port 8282 by default ```./ngRok http 8282``` .

## How to run

1. ```npm install``` 
2. ```sudo npm start```
3. Open ``` http://localhost:8282``` in your browser. 
4. Login with your account(By default it does not work with QA accounts, you need to change the CSDS domain property in [settings.json](settings.json)).

### Run NgRok

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/ngrock1.gif)

### Configure webhooks endpoints

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/webhook_config.gif)


## Run with docker

1. Create the image ```docker build -t demo-connector-app .```
2. Create the image ```docker run -p 443:443 -d demo-connector-app ```
3. Open ``` https://localhost``` in your browser.


## How to use

1. Login with a valid brandID, user and password. (the first time it will redirect you to the "step by step" settings section).
1. You have to select an installed APP from the list.
1. Add your server url in to the webhooks configuration endpoints of the selected APP. E.g. for NgRok is should be similar like 
https://b36a71d7.ngrok.io/notifications/event. Every webhooks endpoint should be on the following format: https://{your server url}/notifications/event
1. After updating the webhooks endpoints you will be redirected to the chat window.
1. Type any message in order to start a conversation.
1. You can login with you account in liveEngage platform, see the sent messages and play with it.

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/example.gif)
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

##Send and handle conversation events

The demo connector app can hadle most and send most of the conversation events descrived int the 
[oficial documuentation](https://developers.liveperson.com/connector-api-examples-send-chat-state-events.html)



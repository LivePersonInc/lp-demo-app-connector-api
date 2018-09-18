# Demo App for connector API

This project contains a demo app for connector api that can create a conversation within a consumer and an agent. 
You can send messages and events with it as well as 
visualize the incoming event notifications.

Look at [Connector API first steps](https://developers.liveperson.com/connector-api-first-steps-overview.html) for a better
understanding.

---

`Important!`

This app ONLY should be used with TEST ACCOUNTS, it could compromise your sensitive data. Since this app is no using
any data base, sensitive data is saved in your browser local storage. (this will be changed in the future).

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [How to make it running](#how-to-make-it-running)
    - [Running NgRok](#running-ngrok)
    - [Running with docker](#running-with-docker)
  - [Usage](#usage)
  - [Settings](#settings)
    - [Configuring the_webhooks endpints](#configuring-the-webhooks-endpoints)
  - [Development Mode](#development-mode)
    - [Project structure](#project-structure)
    - [Sending and handling conversation events](#Sending-and-handling-conversation-events)

## Requirements.

- Node 6.9.0 or higher, together with NPM 3 or higher.
- [Angular CLI](https://cli.angular.io/) 1.7.3 or higher. 
- A valid brandID with Async prop Messaging enabled.
- An installed APP for your brandID with the data sources configured in LiveEngage. 
- Your server must be accessible if you want to receive events from webhooks. Or you can use a tool to redirect all the
 notifications from outside to your internal network.
  * (optional). Use [NgRok](#running-ngrok) for redirecting the webhooks notifications from internet to your local host.
  Run it with the port 8282 by default ```./ngRok http 8282``` .

## Installation

In order to install the project dependencies:

 ```npm install``` 

## How to make it running

1. ```sudo npm start``` will build the project and start the server.
1. Open ``` http://localhost:8282``` in your browser. 
1. Login with your account(By default it does not work with QA accounts, you need to change the CSDS domain property in [settings.json](settings.json)).

### Running NgRok

  You can use [NgRok](https://ngrok.com/)  as an optional tool for redirecting the webhooks notifications from internet to your local host.
  The default port is 8282. To run it, you have to [download](https://ngrok.com/download) and execute the following command (in the same directory):
  
  ```./ngRok http 8282``` 
  
![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/ngrock1.gif)


### Running with docker

Requirements: [docker](https://www.docker.com/products/docker-desktop) installed and running in your computer. 

1. Create the image ```docker build -t demo-connector-app .```
2. Run the image ```docker run -p 443:443 -d demo-connector-app ```
3. Open ``` https://localhost``` in your browser.


## Usage

1. Login with a valid brandID, user and password. (the first time it will redirect you to the "step by step" settings section).
1. You have to select an installed APP from the list.
1. Add your server url in to the [webhooks configuration endpoints](#configuring-the-webhooks-endpoints) of the selected APP. 
E.g. for NgRok is should be similar like 
```https://b36a71d7.ngrok.io/notifications/event``. Every webhooks endpoint should be on the following format: ``https://{your server url}/notifications/event``
1. After updating the webhooks endpoints you will be redirected to the chat window.
1. Type any message in order to start a conversation.
1. You can login with you account in liveEngage platform, see the sent messages and play with it.

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/example.gif)

## Settings

Before running or deployment it is necessary to setup some configuration parameters:
- settings.json:
  1. [CSDS_DOMAIN] : The domain of the service to get the rest of domains. (Production csds domain by default)
  1. [SERVER_HTTP_PORT] : The port of the server listening for webhooks notifications. NOTE: The server is running in http and
  https, if u are using https the port cant be changed (443).

### Configure the webhooks endpoints
In your app installation you need to add this webhook listener server url:<br/>  You can add this after login, in the configuration webhooks page.

``https://{your server domain or ip}/notifications/event``

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/webhook_config.gif)

## Development Mode:

Angular CLI provides a fast development server using Webpack. Every change is automatically refreshed in the browser.

To run the application using the dev server instead a built project:

1. ```sudo node app``` to run the server
1. ```ng serve``` to run web development server
1. open ``` http://localhost:4200``` in your browser. All changes in the web folder would be reflected immediately

### Project structure

- Server: NodeJS server used as notification server (receive webhooks notifications and map it to the correct conversation).
The server is also used as a bridge to avoid Cross-Domain restrictions in the browser.
- Web app: Angular 5 project.

### Sending and handling conversation events

The demo connector app can handle most of the conversation events described int the 
[developers documentation](https://developers.liveperson.com/connector-api-examples-send-chat-state-events.html)
and in [send-endpoint section](https://developers.liveperson.com/connector-api-api-reference-send.html#mspublishevent-properties-2).

#### Chat state events

#### Message status events


![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/imgs/chat-state.png)




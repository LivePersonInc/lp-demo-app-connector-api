# Demo App for connector API

This project contains a demo app for the Connector API that can create a conversation within a consumer and an agent. 
You can send messages and events with it as well as 
visualize the incoming events or notifications.

Look at [Connector API first steps](https://developers.liveperson.com/connector-api-first-steps-overview.html) for a better
understanding.

---

`Important!`

This app ONLY should be used with TEST ACCOUNTS, it could compromise your sensitive data. Since this app is not using
any database, sensitive data are saved in your browser local storage (this will be changed in the future).

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [How to make it running](#how-to-make-it-running)
    - [Running NgRok](#running-ngrok)
    - [Running with Docker](#running-with-docker)
  - [Usage](#usage)
  - [Settings](#settings)
    - [Configuring the webhooks endpoints](#configuring-the-webhooks-endpoints)
  - [Development Mode](#development-mode)
    - [Project structure](#project-structure)
    - [Sending and handling conversation events](#sending-and-handling-conversation-events)
      - [Message sequence number](#message-sequence-number)
      - [Chat state events](#chat-state-events)
      - [Message status events](#message-status-events)



## Requirements.

- Node 6.9.0 or higher, together with NPM 3 or higher.
- [Angular CLI](https://cli.angular.io/) 1.7.3 or higher. 
- A valid brandID with _Async prop Messaging_ enabled.
- An installed APP for your brandID with the data sources configured in LiveEngage. 
- Your server must be accessible if you want to receive events from webhooks. Or you can use a tool to redirect all the
 notifications from outside to your internal network.
  * (optional). Use [NgRok](#running-ngrok) for redirecting the webhooks notifications from internet to your local host.
  Run it with the port 8282 by default ```./ngRok http 8282``` .

## Installation

In order to install the project dependencies type this command in a terminal from the root folder where the project is located:

 ```npm install``` 

## How to make it running

1. ```sudo npm start``` will build the project and start the server.
1. Open ``` http://localhost:8282``` in your browser. 
1. Login with your account (by default it does not work with QA accounts, you need to change the CSDS domain property in [settings.json](settings.json)).

### Running NgRok

  You can use [NgRok](https://ngrok.com/) as an optional tool for redirecting the webhooks notifications from the internet to your local host.
  The default port that we use in our server is 8282. To run it, you have to [download](https://ngrok.com/download) and execute the following command (in the same directory):
  
  ```./ngRok http 8282``` 
  
![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/ngrock1.gif)


### Running with Docker

Requirements: [Docker](https://www.docker.com/products/docker-desktop) installed and running in your computer. 

1. Create the image ```docker build -t demo-connector-app .```
2. Run the image ```docker run -p 443:443 -p 8282:8282 -d demo-connector-app ```  
(After this command, You need to wait 1 or 2 minutes till be able to open the app in a browser)
3. Open ``` http://localhost:8282``` in your browser. 

## Usage

1. Login with a valid brandID, user and password (the first time it will redirect you to the "step by step" settings section).
1. You have to select an installed APP from the list.
1. Add your server url to the [webhooks configuration endpoints](#configure-the-webhooks-endpoints) of the selected APP. For using NgRok the URL should be similar like 
``https://b36a71d7.ngrok.io/notifications/event``. Every webhooks endpoint should be on the following format: ``https://{your server url}/notifications/event``
1. After updating the webhooks endpoints you will be redirected to the chat window.
1. Type any message in order to start a conversation.
1. You can login with you account in LiveEngage platform, see the sent messages and play with it.

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/example.gif)

## Settings

Before running the app, maybe you want to change some configuration parameters in [settings.json](settings.json):

  1. [CSDS_DOMAIN] : The URL of the Domain API from which you can get the base URLs of any service (the production Domain API is set by default).
  1. [SERVER_HTTP_PORT] : The port of the server listening for webhooks notifications. NOTE: The server is running in http and
  https; if you are using https the port cannot be other than 443.

### Configure the webhooks endpoints

In your app installation you need to add this webhook listener server url:

``https://{your server domain or ip}/notifications/event``

You can add this after login, in the configuration webhooks page.

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/gifs/webhook_config.gif)

## Development Mode:

Angular CLI provides a fast development server using Webpack. Every change is automatically refreshed in the browser.

To run the application using the dev server instead of a built project:

1. ```sudo node app``` to run the server
1. ```ng serve``` to run web development server
1. Open ``` http://localhost:4200``` in your browser. All changes in the web folder would be reflected immediately

### Project structure

- Server: NodeJS server used as notification server (receive webhooks notifications and map it to the correct conversation).
The server is also used as a bridge to avoid Cross-Domain restrictions in the browser.
- Web app: Angular 5 project.

### Sending and handling conversation events

The demo connector app can handle most of the conversation events described in the 
[developers documentation](https://developers.liveperson.com/connector-api-examples-send-chat-state-events.html)
and especially in [send-endpoint section](https://developers.liveperson.com/connector-api-api-reference-send.html#mspublishevent-properties-2).

Most of those events are reflected in the UI, e.g. when a user is typing or a message is read.

####  Message sequence number

The sequence of every message is obtained after each request. A Message object is created with this sequence number. This
is very important to save in order to handle the message status events like READ, ACCEPT, etc.

```json
{
    "reqId": "1",
    "code": "OK",
    "body": {
        "sequence": 0
    }
}
```



#### Chat state events


 - COMPOSING: A request is sent with this event when consumer starts to typing in the chat box.
   Example of consumer request:
     ```json
    {  
       "kind":"req",
       "id":"1",
       "type":"ms.PublishEvent",
       "body":{  
          "dialogId":"b3aea67d-01ca-4bf7-af4f-9897cf6b77a7",
          "event":{  
             "type":"ChatStateEvent",
             "chatState":"COMPOSING"
          }
       }
    }
    
    ```
 
   Example of a received notification, in this case when agent is composing:
     ```json
       {
      "kind": "notification",
      "body": {
        "changes": [
          {
            "originatorId": "662eb2c6-cf25-5ea8-8fbd-9f1781558c24",
            "originatorMetadata": {
                   "id": "662eb2c6-cf25-5ea8-8fbd-9f1781558c24",
                   "role": "ASSIGNED_AGENT"
                 },
                 "event": {
                   "type": "ChatStateEvent",
                   "chatState": "COMPOSING"
                 },
                 "conversationId": "b3aea67d-01ca-4bf7-af4f-9897cf6b77a7",
                 "dialogId": "b3aea67d-01ca-4bf7-af4f-9897cf6b77a7"
               }
             ]
           },
           "type": "ms.MessagingEventNotification"
         }
    ```

     In order to show that the consumer has stopped typing, we need to pass any other state which is different 
     from COMPOSING (it does not matter which value you choose, as long as it is not COMPOSING) i.e. ACTIVE , INACTIVE, GONE, PAUSE.
     In this app, we pass a PAUSE event every time the consumer stops typing.
      
      ![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/imgs/typing.png) 

 
 - PAUSE: In this APP this event is sent after consumer stops typing.

 - ACTIVE: LiveEngage normally sends ACTIVE events after composing instead of PAUSE. In this app ACTIVE is sent
 when the window focus event is triggered. That happens when you are in the demo app tab or by clicking into the chat box after
 return from another window.
 
    Example received notification:
     ```json
    {
      "kind": "notification",
      "body": {
        "changes": [
          {
            "originatorId": "31fe13ba27250bfff439a6f875cfd135cf64f680f9dded3b123cb0529d1e5a29",
            "originatorMetadata": {
              "id": "31fe13ba27250bfff439a6f875cfd135cf64f680f9dded3b123cb0529d1e5a29",
              "role": "CONSUMER"
            },
            "event": {
              "type": "ChatStateEvent",
              "chatState": "ACTIVE"
            },
            "conversationId": "b3aea67d-01ca-4bf7-af4f-9897cf6b77a7",
            "dialogId": "b3aea67d-01ca-4bf7-af4f-9897cf6b77a7"
          }
        ]
      },
      "type": "ms.MessagingEventNotification"
    }
    ```
 - GONE: In this app, this event is sent when a window Blur event is triggered, that means when a user opens other tab or window.
 - INACTIVE: Not implemented for this app. It could be added easily and send a request after the user does not use the app for a 
determined period of time. 
 

#### Message status events 

The demo connector app also can handle most of the message status events, i.e. when a message is send, read or accepted.

- ACCEPT: This event request indicates to the agent the list of messages that were accepted.

  ```json
  {
    "kind": "req",
    "id": "1,",
    "type": "ms.PublishEvent",
    "body": {
      "dialogId": "88166f48-6254-496f-9508-96b044fc0442",
      "event": {
        "type": "AcceptStatusEvent",
        "status": "ACCEPT",
        "sequenceList": [
          2,3,5 
        ]
      }
    }
  }
    
  ```
  
- READ: This event request indicates to the agent the list of messages which were read.

  ```json
  {
    "kind": "req",
    "id": "1,",
    "type": "ms.PublishEvent",
    "body": {
      "dialogId": "88166f48-6254-496f-9508-96b044fc0442",
      "event": {
        "type": "AcceptStatusEvent",
        "status": "READ",
        "sequenceList": [
          2,3,5
        ]
      }
    }
  }
    
  ```
  
  When an agent has read some of your messages, you will get via webhooks a notification like this:
  
  ```json
        {
    "kind": "notification",
    "body": {
      "changes": [
        {
          "sequence": 9,
          "originatorId": "662eb2c6-cf25-5ea8-8fbd-9f1781558c24",
          "originatorMetadata": {
            "id": "662eb2c6-cf25-5ea8-8fbd-9f1781558c24",
            "role": "ASSIGNED_AGENT"
          },
          "serverTimestamp": 1537343869240,
          "event": {
            "type": "AcceptStatusEvent",
            "status": "READ",
            "sequenceList": [
              6
            ]
          },
          "conversationId": "f66ad121-8dcb-4430-9fc2-731e961f6eae",
          "dialogId": "f66ad121-8dcb-4430-9fc2-731e961f6eae"
        }
      ]
    },
    "type": "ms.MessagingEventNotification"
  }
     
  ```
- NACK: Not implemented for this app.
- ACTION: Not implemented for this app.

![alt text](https://lpgithub.dev.lprnd.net/RnD-Mannheim/lp-demo-app-connector-api/blob/master/docs/imgs/chat-state.png)








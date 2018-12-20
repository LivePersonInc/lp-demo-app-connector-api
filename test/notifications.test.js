const nock = require('nock');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
var EventSource = require('eventsource')


const wait = ms => new Promise(resolve => {
  console.log(`... wait for ${ms / 1000}s ...`);
  setTimeout(() => resolve(), ms);
});


describe('Notifications tests', () => {
  chai.use(chaiHttp);
  const requester = chai.request(app).keepOpen();

  const timeout = 7000;
  const conversationID = '69d7026e-67e7-47ab-8dcb-ec14dfcdd31d';
  const appKey = 'abce35egjop2035236004egewgewgewagew';
  const appSecret = 'e4vt53s0kafe2o7h7ck51cvra9';
  const webhookNotification = {"kind":"notification","body":{"changes":[{"type":"UPSERT","result":{"convId":"69d7026e-67e7-47ab-8dcb-ec14dfcdd31d","effectiveTTR":1544179332214,"conversationDetails":{"skillId":"-1","participants":[{"id":"5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c","role":"CONSUMER"}],"dialogs":[{"dialogId":"69d7026e-67e7-47ab-8dcb-ec14dfcdd31d","participantsDetails":[{"id":"5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c","role":"CONSUMER"}],"dialogType":"MAIN","channelType":"MESSAGING","state":"OPEN","creationTs":1544178732211,"metaDataLastUpdateTs":1544178732211}],"brandId":"42257269","state":"OPEN","stage":"OPEN","startTs":1544178732211,"metaDataLastUpdateTs":1544178732211,"ttr":{"ttrType":"PRIORITIZED","value":600}}}}]},"type":"cqm.ExConversationChangeNotification"};

  const webhookNotification_second_type = {
    "kind": "notification",
    "body": {
      "changes": [
        {
          "sequence": 4,
          "originatorId": "5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c",
          "originatorMetadata": {
            "id": "5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c",
            "role": "CONSUMER"
          },
          "serverTimestamp": 1544190529528,
          "event": {
            "type": "ContentEvent",
            "message": "ae",
            "contentType": "text/plain"
          },
          "conversationId": "69d7026e-67e7-47ab-8dcb-ec14dfcdd31d",
          "dialogId": "69d7026e-67e7-47ab-8dcb-ec14dfcdd31d"
        }
      ]
    },
    "type": "ms.MessagingEventNotification"
  };

  before( () => {

  });
  after(()=> {
    requester.close();
  });

  describe('Server is up and running', () => {

    it('Health check should return 200', async () => {
      let response = await requester.get('/health');
      expect(response.statusCode).to.be.equal(200);
    }).timeout(timeout);

    it('Should return 400 when notification contains the conversation id but is not subscribed', async () => {
      let response = await requester.post('/notifications/event')
        .send(webhookNotification);

      expect(response.statusCode).to.be.equal(400);

    }).timeout(timeout);

    it('Should return 400 when notification does not contains the conversation id', async () => {
      let response = await requester.post('/notifications/event')
        .send({"tste":3, "errr": "sdg"});

      expect(response.statusCode).to.be.equal(400);

    }).timeout(timeout);

    /*it('Should return 200 when notification contains the conversation id and is subcscribed', async () => {
      var es = new EventSource(`http://localhost:8282/notifications/subscribe/${conversationID}/${appKey}`);

      es.addEventListener('message', function (e) {
        console.log(e);
      });

      await wait(1000);

      let response = await requester.post('/notifications/event')
        .send(webhookNotification);

      es.close();

      await wait(1000);

      expect(response.statusCode).to.be.equal(200);

    }).timeout(timeout);


    it('Should return 200 when notification ms.MessagingEventNotification contains the conversation id and is subcscribed', async () => {
      var es = new EventSource(`http://localhost:8282/notifications/subscribe/${conversationID}/${appKey}`);

      es.addEventListener('message', function (e) {
        console.log(e);
      });

      await wait(1000);

      let response = await requester.post('/notifications/event')
        .send(webhookNotification_second_type);

      es.close();

      await wait(1000);

      expect(response.statusCode).to.be.equal(200);

    }).timeout(timeout);*/

  });

});

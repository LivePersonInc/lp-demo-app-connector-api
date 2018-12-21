const nock = require('nock');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const subscriptionsHandler = require('../server/util/subscriptionsHandler');
const SSE = require('sse-nodejs');
const http = require('http');

const wait = ms => new Promise(resolve => {
  console.log(`... wait for ${ms / 1000}s ...`);
  setTimeout(() => resolve(), ms);
});

describe('Notifications tests', () => {
  chai.use(chaiHttp);

  const requester = chai.request(app).keepOpen();
  const timeout = 7000;
  const brandId = '42257269';
  const conversationID = 'b8b83fe9-75f0-46f2-baaa-2930f7192cfb';
  const appKey = '81fad476-88af-4d08-bc0e-20bc69439ed4';
  const appSecret = 'rl9hacst6kqilbofup64n11ga3';

  //MOCK http response
  const mockHttpResponse = new http.OutgoingMessage();
  mockHttpResponse.writeHead =  () => {};
  http.OutgoingMessage.prototype._implicitHeader = () => true;

  const webhookNotification = {"kind":"notification","body":{"changes":[{"type":"UPSERT","result":{"convId":"69d7026e-67e7-47ab-8dcb-ec14dfcdd31d","effectiveTTR":1544179332214,"conversationDetails":{"skillId":"-1","participants":[{"id":"5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c","role":"CONSUMER"}],"dialogs":[{"dialogId":"69d7026e-67e7-47ab-8dcb-ec14dfcdd31d","participantsDetails":[{"id":"5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c","role":"CONSUMER"}],"dialogType":"MAIN","channelType":"MESSAGING","state":"OPEN","creationTs":1544178732211,"metaDataLastUpdateTs":1544178732211}],"brandId":"42257269","state":"OPEN","stage":"OPEN","startTs":1544178732211,"metaDataLastUpdateTs":1544178732211,"ttr":{"ttrType":"PRIORITIZED","value":600}}}}]},"type":"cqm.ExConversationChangeNotification"};

  const webhookNotification_second_type = {"kind": "notification", "body": {"changes": [{"sequence": 4, "originatorId": "5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c", "originatorMetadata": {"id": "5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c", "role": "CONSUMER"}, "serverTimestamp": 1544190529528, "event": {"type": "ContentEvent", "message": "ae", "contentType": "text/plain"}, "conversationId": "69d7026e-67e7-47ab-8dcb-ec14dfcdd31d", "dialogId": "69d7026e-67e7-47ab-8dcb-ec14dfcdd31d"}]}, "type": "ms.MessagingEventNotification"};

  after(()=> {
    requester.close();
  });

  describe('Server is up and running and notifications events are working correctly', () => {

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

    it('Should return 200 when notification type is ms.MessagingEventNotification, contains the conversation id and is subscribed', async () => {
      //GIVEN
      const event = {"kind":"notification","body":{"changes":[{"originatorId":"2969e404f3be1c8cdda63f0b72d205ab5afb3fe3e3d7d72ab58245f564fdfd91","originatorMetadata":{"id":"2969e404f3be1c8cdda63f0b72d205ab5afb3fe3e3d7d72ab58245f564fdfd91","role":"CONSUMER"},"event":{"type":"ChatStateEvent","chatState":"PAUSE"},"conversationId":"b8b83fe9-75f0-46f2-baaa-2930f7192cfb","dialogId":"b8b83fe9-75f0-46f2-baaa-2930f7192cfb"}]},"type":"ms.MessagingEventNotification"};

      subscriptionsHandler.subscriptions[conversationID] = [SSE(mockHttpResponse), appKey, appSecret, brandId];
      //WHEN
      let response = await requester.post('/notifications/event')
        .set('x-liveperson-account-id', '42257269')
        .set('x-liveperson-client-id', '81fad476-88af-4d08-bc0e-20bc69439ed4')
        .set('x-liveperson-signature', 'sha1=e/TfS0wv1HbvEsMqcBMmFLcMslI=')
        .send(event);
      //THEN
      expect(response.statusCode).to.be.equal(200);
    }).timeout(timeout);

   it('Should return 200 when notification type is  cqm.ExConversationChangeNotification, contains the conversation id and is subscribed', async () => {
     //GIVEN
     const event = {"kind":"notification","body":{"changes":[{"type":"UPSERT","result":{"convId":"b8b83fe9-75f0-46f2-baaa-2930f7192cfb","effectiveTTR":-1,"conversationDetails":{"skillId":"-1","participants":[{"id":"52e05c00-d5e4-5823-acf7-62570b939a63","role":"CONTROLLER"},{"id":"2969e404f3be1c8cdda63f0b72d205ab5afb3fe3e3d7d72ab58245f564fdfd91","role":"CONSUMER"}],"dialogs":[{"dialogId":"b8b83fe9-75f0-46f2-baaa-2930f7192cfb","participantsDetails":[{"id":"2969e404f3be1c8cdda63f0b72d205ab5afb3fe3e3d7d72ab58245f564fdfd91","role":"CONSUMER"},{"id":"52e05c00-d5e4-5823-acf7-62570b939a63","role":"CONTROLLER"}],"dialogType":"MAIN","channelType":"MESSAGING","state":"CLOSE","creationTs":1545398580042,"endTs":1545399379370,"metaDataLastUpdateTs":1545399379370,"closedBy":"CONSUMER"}],"brandId":"42257269","state":"CLOSE","stage":"CLOSE","closeReason":"CONSUMER","startTs":1545398580042,"endTs":1545399379370,"metaDataLastUpdateTs":1545399379370,"ttr":{"ttrType":"PRIORITIZED","value":600}}}}]},"type":"cqm.ExConversationChangeNotification"}

     subscriptionsHandler.subscriptions[conversationID] = [SSE(mockHttpResponse), appKey, appSecret, brandId];
     //WHEN
     let response = await requester.post('/notifications/event')
       .set('x-liveperson-account-id', '42257269')
       .set('x-liveperson-client-id', '81fad476-88af-4d08-bc0e-20bc69439ed4')
       .set('x-liveperson-signature', 'sha1=CKiT6u4nb4Mpi0tdbCbgBXKAF1E=')
       .send(event);
     //THEN
     expect(response.statusCode).to.be.equal(200);
    }).timeout(timeout);
  });
});

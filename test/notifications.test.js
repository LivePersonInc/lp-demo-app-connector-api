const nock = require('nock');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');



describe('Notifications tests', () => {
  chai.use(chaiHttp);
  const timeout = 4000;
  const conversationID = 'c32e8382-06b4-4b82-ae8a-84fc6a17d673';

  const webhookNotification = {"kind":"notification","body":{"changes":[{"type":"UPSERT","result":{"convId":"69d7026e-67e7-47ab-8dcb-ec14dfcdd31d","effectiveTTR":1544179332214,"conversationDetails":{"skillId":"-1","participants":[{"id":"5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c","role":"CONSUMER"}],"dialogs":[{"dialogId":"69d7026e-67e7-47ab-8dcb-ec14dfcdd31d","participantsDetails":[{"id":"5c40c7731ad3f3d49a4a7cdd90e01dd33ab95446a7451884a76ab3079a757a5c","role":"CONSUMER"}],"dialogType":"MAIN","channelType":"MESSAGING","state":"OPEN","creationTs":1544178732211,"metaDataLastUpdateTs":1544178732211}],"brandId":"42257269","state":"OPEN","stage":"OPEN","startTs":1544178732211,"metaDataLastUpdateTs":1544178732211,"ttr":{"ttrType":"PRIORITIZED","value":600}}}}]},"type":"cqm.ExConversationChangeNotification"};
  ;

  before( () => {

  });

  describe('Server is up and running', () => {

    it('Health check should return 200', async () => {
      let response = await chai.request(app).get('/health');
      expect(response.statusCode).to.be.equal(200);
    }).timeout(timeout);


    it('Health check should return 200', async () => {
      let response = await chai.request(app).get('/domains/csds/' +  conversationID);
      expect(response.statusCode).to.be.equal(200);

    }).timeout(timeout);

    it('Health check should return 200', async () => {
      //await chai.request(app).get('/notifications/subscribe/' +  conversationID);
      let response = await chai.request(app).post('/notifications/event')
        .send(webhookNotification);

      expect(response.statusCode).to.be.equal(200);

    }).timeout(timeout);

  });






});

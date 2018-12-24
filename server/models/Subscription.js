class Subscription {
  constructor(sseObject, appKey, appSecret, brandId) {
    this.sseObject = sseObject;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.brandId = brandId;
  }
}

module.exports = Subscription;

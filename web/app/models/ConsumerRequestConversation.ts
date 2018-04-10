export class ConsumerRequestConversation {
  public ttrDefName;
  public campaignInfo;
  public channelType;
  public brandId;
  public skillId;
  constructor(ttrDefName, campaignInfo, channelType, brandId, skillId) {
    this.ttrDefName = ttrDefName || "CUSTOM";
    this.campaignInfo = campaignInfo;
    this.channelType = channelType || "MESSAGING";
    this.brandId = brandId;
    this.skillId = skillId || -1;
  }
}


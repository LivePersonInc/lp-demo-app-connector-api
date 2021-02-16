export class ConsumerRequestConversation {
  public ttrDefName;
  public campaignInfo;
  public channelType;
  public brandId;
  public skillId;
  public conversationContext;
  constructor(ttrDefName, campaignInfo, channelType, brandId, skillId, conversationContext) {
    this.ttrDefName = ttrDefName;
    this.campaignInfo = campaignInfo;
    this.channelType = channelType || "MESSAGING";
    this.brandId = brandId;
    this.skillId = skillId || -1;
    this.conversationContext = conversationContext ||  {};
  }
}


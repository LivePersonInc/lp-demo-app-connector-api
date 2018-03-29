
export  class SetUserProfile {
  public firstName;
  public lastName;
  public avatarUrl;
  public role;
  public backgndImgUri;
  public description;
  public privateData;

  constructor(firstName, lastName, avatarUrl, role, backgndImgUri, description, privateData) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.role = role;
    this.backgndImgUri = backgndImgUri;
    this.description = description;
    this.privateData = privateData;
  }
}


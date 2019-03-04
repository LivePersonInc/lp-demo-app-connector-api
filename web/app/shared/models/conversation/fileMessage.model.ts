export class FileMessage {
  name: string;
  preview: string; // base64 encoded img
  relativePath: string;

  constructor(name, preview, relativePath) {
    this.name = name;
    this.preview = preview;
    this.relativePath = relativePath;
  }

}

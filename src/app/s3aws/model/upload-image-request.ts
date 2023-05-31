export class UploadImageRequest {
  fileName: string;
  contentType: string;
  contentLength: number;

  constructor(
    fileName: string,
    contentType: string,
    contentLength: number
  ) {
    this.fileName = fileName;
    this.contentType = contentType;
    this.contentLength = contentLength;
  }

}

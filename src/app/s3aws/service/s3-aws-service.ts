import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UploadImageRequest } from '../model/upload-image-request';
import { UploadRequestResult } from '../model/upload-request-result';

@Injectable({
  providedIn: 'root'
})
export class S3AwsService {

  private readonly API_UPLOAD = 'api/upload';

  constructor(private httpClient: HttpClient) { }

  imageUploadRequest(uploadImage: UploadImageRequest, image: any): Observable<UploadRequestResult> {
    return this.httpClient.post<UploadRequestResult>(environment.API + this.API_UPLOAD, uploadImage)
                          .pipe(tap(result => this.saveImageS3(result.uploadSignedUrl, image)));
  }

  private saveImageS3(uploadSignedUrl: string, image: any) {
    this.httpClient.put<any>(uploadSignedUrl, image)
                   .pipe(take(1))
                   .subscribe();
  }

}

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import DomToImage from 'dom-to-image';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  backendPath: string = 'http://localhost:80/projects/backend/qr_code_reader.php';

  constructor(private http: HttpClient) { }

  downloadQR(QR: HTMLElement): void {
    let qrToDownload: HTMLImageElement = (QR.getElementsByTagName('img'))[0];
    DomToImage.toJpeg(qrToDownload)
    .then((dataUrl) => {
      let url = document.createElement('a');
      url.download = `Order${Date.now()}.jpeg`;
      url.href = dataUrl;
      url.click();
    });
  }

  uploadQR(qrUpload: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.backendPath, qrUpload, { headers: headers });
  }

}
import { Injectable } from '@angular/core';

import DomToImage from 'dom-to-image';

@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  constructor() { }

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

  uploadQR() {
  }

}
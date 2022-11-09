import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataStreamService } from 'src/app/services/data-stream.service';

declare var QRCode: any;

@Component({
  selector: 'app-deploy-form',
  templateUrl: './deploy-form.component.html',
  styleUrls: ['./deploy-form.component.css']
})
export class DeployFormComponent implements OnInit, OnChanges {

  @Output() deployRequest = new EventEmitter<string>;
  @Output() searchRequest = new EventEmitter<string>;

  public qrcode: any;

  qrDiv!: HTMLElement;

  error: string | undefined;
  public ethereum_regex = /^0x[a-fA-F0-9]{40}$/;

  @Input() contractAddress!: string;

  constructor(private dataStream: DataStreamService) {
  }

  ngOnInit(): void {
    this.qrDiv = document.getElementById('qr')!;
    this.qrcode = new QRCode(this.qrDiv, 'welcome');
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.contractAddress !== undefined) {
      this.qrcode.clear();
      this.qrcode.makeCode(this.contractAddress);
    }
  }

  deployForm = new FormGroup({
    customerAddress: new FormControl('', Validators.required)
  });

  searchForm = new FormGroup({
    searchAddress: new FormControl('', Validators.required)
  });

  async deploy(): Promise<void> {
    let input = this.deployForm.value.customerAddress as string;

    if (input.match(this.ethereum_regex)) {

      this.error = undefined;
      this.deployRequest.emit(input);

    } else {
      this.error = "Please insert a valid ETH address!";
    }
  }

  async search(): Promise<void> {
    let input = this.searchForm.value.searchAddress as string;
    this.error = undefined;
    if (input.match(this.ethereum_regex)) {
      this.searchRequest.emit(input);
    } else {
      this.error = "ETH address not valid!";
    }
  }

  download(): void {
    this.dataStream.downloadQR(this.qrDiv);
  }

  upload($event: any): void {
    let formData = new FormData();
    let uploadedQR: File = $event.target.files[0];

    if (['jpg', 'jpeg', 'png'].includes(uploadedQR.type)) {
      formData.append("qr-upload", uploadedQR);

      this.dataStream.uploadQR(formData)
        .subscribe({
          next: (res) => {
            this.searchForm.setValue({ searchAddress: res });
            this.search();
          },
          error: (err) => {
            this.error = "Something's gone wrong...";
            console.log(err);
          }});
    } else {
      this.error = "Wrong QR format! QR must be an image!";
    }
  }

  cameraQR() {}

}
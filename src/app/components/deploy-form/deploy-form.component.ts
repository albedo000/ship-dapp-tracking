import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  href!: string;

  error: string | undefined;
  public ethereum_regex = /^0x[a-fA-F0-9]{40}$/;

  @Input() contractAddress!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.qrcode = new QRCode(document.getElementById('qr'), 'welcome');
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
      this.error = "Please insert a valid ETH address!";
    }
  }

  download() {
    
  }

  upload() { }

}

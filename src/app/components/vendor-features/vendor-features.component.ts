import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ethers } from 'ethers';

@Component({
  selector: 'app-vendor-features',
  templateUrl: './vendor-features.component.html',
  styleUrls: ['./vendor-features.component.css']
})
export class VendorFeaturesComponent implements OnInit {

  transportationForm = new FormGroup({
    vectorAddress: new FormControl('', Validators.required)
  });

  @Input() logistic!: ethers.Contract;
  @Input() changeState!: EventEmitter<void>;

  constructor() { }

  ngOnInit(): void {
  }

  async transport(): Promise<void> {
    await this.logistic['transportation'](this.transportationForm.value.vectorAddress as string);
    this.logistic.on('changeState', () => {
      this.changeState.emit();
    });
  }

  async acceptRefund(): Promise<void> {
    await this.logistic['refund']();
  }

  async gain(): Promise<void> {
    await this.logistic['gain']();
    this.logistic.on('changeState', () => {
      this.changeState.emit();
    })
  }

}

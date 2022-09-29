import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ethers } from 'ethers';

@Component({
  selector: 'app-vector-features',
  templateUrl: './vector-features.component.html',
  styleUrls: ['./vector-features.component.css']
})
export class VectorFeaturesComponent implements OnInit {

  @Input() logistic!: ethers.Contract;
  delegateForm = new FormGroup({
    delegateAddress: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  async delegate(): Promise<void> {
    await this.logistic['delegate'](this.delegateForm.value.delegateAddress as string);
  }

  async deliveryReceived(): Promise<void> {
    await this.logistic['received']();
  }

}

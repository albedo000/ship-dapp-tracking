import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {ethers} from 'ethers';


@Component({
  selector: 'app-customer-features',
  templateUrl: './customer-features.component.html',
  styleUrls: ['./customer-features.component.css']
})
export class CustomerFeaturesComponent implements OnInit {

  @Input() logistic!: ethers.Contract;
  @Input() changeState!: EventEmitter<void>;

  payForm = new FormGroup({
    amount: new FormControl<number>(0)
  });

  constructor() { }

  ngOnInit(): void {
  }

  async pay(): Promise<void> {
    await this.logistic['pay'](this.payForm.value.amount as number);
    this.logistic.on('changeState', () => {
      this.changeState.emit();
    });
  }

  async refund(): Promise<void> {
    await this.logistic['refund']();
  }

  async withdraw(): Promise<void> {
    await this.logistic['withdraw']();
    this.logistic.on('changeState', () => {
      this.changeState.emit();
    })
  }

}

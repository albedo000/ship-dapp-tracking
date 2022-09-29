import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ethers } from 'ethers';

import { Observable, of } from 'rxjs';

import { orderState } from 'src/app/utilities/order-state';

@Component({
  selector: 'app-contract-state',
  templateUrl: './contract-state.component.html',
  styleUrls: ['./contract-state.component.css']
})
export class ContractStateComponent implements OnInit, OnChanges {

  @Input() logistic!: ethers.Contract;
  @Input() contractAddress!: string;
  @Input() state!: number;

  @Input() buyer!: string;
  @Input() seller!: string;
  @Input() transport!: string | undefined;

  public infoState!: string;

  public $tate!: Observable<number>;

  nullAddress: string = '0x0000000000000000000000000000000000000000';

  constructor() { }

  ngOnInit(): void {
  }

  async ngOnChanges(_changes: SimpleChanges): Promise<void> {
    if (this.logistic !== undefined) {
      this.checkTransport();
      if (this.state !== undefined) {
        this.$tate = of(this.state);
        this.$tate.subscribe((res) =>  {
          this.infoState = orderState[res];
        });
      }
    }
  }

  async checkTransport() {
    if (this.transport === this.nullAddress) {
      this.transport = undefined;
    }
  }

}

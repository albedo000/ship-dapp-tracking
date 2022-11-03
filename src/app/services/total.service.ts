import { Injectable } from '@angular/core';

import { Contract } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  constructor() { }

  async calculateTotal(contract: Contract): Promise<Number> {
    let total = await contract['getTotal']();
    return total;
  }
}

import { Injectable } from '@angular/core';

import { Contract } from 'ethers';

import { Observable, of } from 'rxjs';

import { Product } from '../utilities/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public serviceProduct: Product[] = [];

  public product$!: Observable<Product[]>;

  constructor() { }

  async add(contract: Contract, id: string, description: string, price: number, quantity: number): Promise<void> {
    await contract['insertProduct'](id, description, price, quantity);
    contract.on('productAdd', () => {
      this.get(contract);
    });
  }

  async get(contract: Contract): Promise<Product[]> {
    let products = await contract['getProducts']();
    if (products !== undefined) {
      this.product$ = of(products);
      this.product$.subscribe((res) => {
        for (let i = 0; i < res.length; i++) {
          this.serviceProduct[i] = {
            id: res[i]['id'],
            description: res[i]['description'],
            price: res[i]['price'],
            quantity: res[i]['quantity']
          }
        }
      })
    }
    return this.serviceProduct;
  }

}

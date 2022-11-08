import { Injectable } from '@angular/core';

import { Contract } from 'ethers';

import { BehaviorSubject } from 'rxjs';

import { Product } from '../utilities/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private total!: number;

  public total$ = new BehaviorSubject(0);
  public product$ = new BehaviorSubject(this.products);

  constructor() { }

  async add(contract: Contract, id: string, description: string, price: number, quantity: number): Promise<void> {
    await contract['insertProduct'](id, description, price, quantity);
    contract.on('productAdd', () => {
      this.get(contract);
    });
  }

  async get(contract: Contract): Promise<void> {
    let _products = await contract['getProducts']();
    this.total = 0;
    this.products = [];
    if (_products !== undefined) {
      for (let i = 0; i < _products.length; i++) {
        let _p: Product = {};
        _p.id = _products[i].id;
        _p.description = _products[i].description;
        _p.price = _products[i].price;
        _p.quantity = _products[i].quantity;
        this.products.push(_p);
      }
      this.product$.next(this.products);
      for (let i = 0; i < this.products.length; i++) {
        this.total += _products[i].price * _products[i].quantity;
        this.total$.next(this.total);
      }
    }
  }
}

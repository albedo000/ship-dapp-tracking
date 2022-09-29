import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ethers } from 'ethers';
import { Observable, of } from 'rxjs';

import { Product } from 'src/app/utilities/product-type';
import { User } from 'src/app/utilities/user-type';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() logistic!: ethers.Contract;
  @Input() user!: User;
  @Input() state!: number;

  showForm: boolean = false;

  public product: Product[] = [];

  public product$!: Observable<Product[]>;

  productForm = new FormGroup({
    id: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number>(0),
    quantity: new FormControl<number>(0),
  });

  constructor() { }


  ngOnInit(): void {}

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.logistic !== undefined) {
      this.get();
    }
    if (this.user === User.buyer && this.state === 0) {
      this.showForm = !this.showForm;
    }
  }

  async get(): Promise<void> {
    let products = await this.logistic['getProducts']();
    if (products !== undefined) {
      this.product$ = of(products);
      this.product$.subscribe((res) => {
        for (let i = 0; i < res.length; i++) {
          this.product[i] = {
            id: res[i]['id'],
            description: res[i]['description'],
            price: res[i]['price'],
            quantity: res[i]['quantity']
          }
        }
      })
    }
  }

  async addProduct(): Promise<void> {
    let id = this.productForm.value.id as string;
    let description = this.productForm.value.description as string;
    let price = this.productForm.value.price as number;
    let quantity = this.productForm.value.quantity as number;
    await this.logistic['insertProduct'](id, description, price, quantity);
    this.logistic.on('productAdd', () => {
      this.get();
    })
  }

}

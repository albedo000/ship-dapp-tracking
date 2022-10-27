import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ethers } from 'ethers';

import { ProductService } from 'src/app/services/product.service';

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

  products: Product[] = [];

  showForm: boolean = false;

  productForm = new FormGroup({
    id: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number>(0),
    quantity: new FormControl<number>(0),
  });

  constructor(private productService: ProductService) { }


  ngOnInit(): void {}

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.logistic !== undefined) {
      this.getProduct();
    }
    if (this.user === User.buyer && this.state === 0) {
      this.showForm = !this.showForm;
    }
    if (this.state !== 0) this.showForm = false;
  }

  async getProduct(): Promise<void> {
    this.products = await this.productService.get(this.logistic);
  }

  async addProduct(): Promise<void> {
    let id = this.productForm.value.id as string;
    let description = this.productForm.value.description as string;
    let price = this.productForm.value.price as number;
    let quantity = this.productForm.value.quantity as number;
    this.productService.add(this.logistic, id, description, price, quantity);
  }

}

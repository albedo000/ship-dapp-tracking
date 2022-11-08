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
  total!: number;
  showForm: boolean = false;

  productForm = new FormGroup({
    id: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number>(0),
    quantity: new FormControl<number>(0),
  });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.product$.subscribe(
      res => this.products = res
    )
    this.productService.total$.subscribe(
      res => this.total = res
    )
  }

  async ngOnChanges(_changes: SimpleChanges): Promise<void> {
    if (this.logistic !== undefined) {
      this.productService.get(this.logistic);
    }
    if (this.user === User.buyer && this.state === 0) {
      this.showForm = true;
    } else this.showForm = false;
  }

  async addProduct(): Promise<void> {
    let id = this.productForm.value.id as string;
    let description = this.productForm.value.description as string;
    let price = this.productForm.value.price as number;
    let quantity = this.productForm.value.quantity as number;
    this.productService.add(this.logistic, id, description, price, quantity);
    this.productForm.reset();
  }

}

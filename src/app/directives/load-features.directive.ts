import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { User } from '../utilities/user-type';

import {ethers} from 'ethers';

import { CustomerFeaturesComponent } from '../components/customer-features/customer-features.component';
import { VendorFeaturesComponent } from '../components/vendor-features/vendor-features.component';
import { VectorFeaturesComponent } from '../components/vector-features/vector-features.component';

@Directive({
  selector: '[appLoadFeatures]'
})
export class LoadFeaturesDirective implements OnChanges {

  @Input() featureLoader!: Type<any>;
  @Input() user!: User;
  @Input() logistic!: ethers.Contract;

  @Output() changeState = new EventEmitter<void>;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnChanges(_changes: SimpleChanges): void {
    this.viewContainerRef.clear();
    switch (this.user) {
      case User.buyer:
        let customer = this.viewContainerRef.createComponent(CustomerFeaturesComponent);
        customer.instance.logistic = this.logistic;
        customer.instance.changeState = this.changeState;
        break;
      case User.seller:
        let seller = this.viewContainerRef.createComponent(VendorFeaturesComponent);
        seller.instance.logistic = this.logistic;
        seller.instance.changeState = this.changeState;
        break;
      case User.vector:
        let vector = this.viewContainerRef.createComponent(VectorFeaturesComponent);
        vector.instance.logistic = this.logistic;
        break;
    }
  }

  

}

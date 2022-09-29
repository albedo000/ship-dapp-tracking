import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFeaturesComponent } from './vendor-features.component';

describe('VendorFeaturesComponent', () => {
  let component: VendorFeaturesComponent;
  let fixture: ComponentFixture<VendorFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorFeaturesComponent } from './vector-features.component';

describe('VectorFeaturesComponent', () => {
  let component: VectorFeaturesComponent;
  let fixture: ComponentFixture<VectorFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VectorFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

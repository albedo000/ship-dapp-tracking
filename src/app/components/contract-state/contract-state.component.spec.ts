import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStateComponent } from './contract-state.component';

describe('ContractStateComponent', () => {
  let component: ContractStateComponent;
  let fixture: ComponentFixture<ContractStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

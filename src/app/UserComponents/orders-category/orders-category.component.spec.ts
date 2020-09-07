import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCategoryComponent } from './orders-category.component';

describe('OrdersCategoryComponent', () => {
  let component: OrdersCategoryComponent;
  let fixture: ComponentFixture<OrdersCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

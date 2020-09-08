import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersCategoryComponent } from './admin-orders-category.component';

describe('AdminOrdersCategoryComponent', () => {
  let component: AdminOrdersCategoryComponent;
  let fixture: ComponentFixture<AdminOrdersCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

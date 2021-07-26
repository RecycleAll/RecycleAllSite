import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderItemComponent } from './my-order-item.component';

describe('MyOrderItemComponent', () => {
  let component: MyOrderItemComponent;
  let fixture: ComponentFixture<MyOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

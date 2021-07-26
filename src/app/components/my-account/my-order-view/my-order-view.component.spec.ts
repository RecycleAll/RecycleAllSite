import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderViewComponent } from './my-order-view.component';

describe('MyOrderViewComponent', () => {
  let component: MyOrderViewComponent;
  let fixture: ComponentFixture<MyOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

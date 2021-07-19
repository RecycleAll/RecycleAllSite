import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedUpdateComponent } from './ordered-update.component';

describe('OrderedUpdateComponent', () => {
  let component: OrderedUpdateComponent;
  let fixture: ComponentFixture<OrderedUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderedComponent } from './single-ordered.component';

describe('SingleOrderedComponent', () => {
  let component: SingleOrderedComponent;
  let fixture: ComponentFixture<SingleOrderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleOrderedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

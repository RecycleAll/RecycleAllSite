import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDonComponent } from './single-don.component';

describe('SingleDonComponent', () => {
  let component: SingleDonComponent;
  let fixture: ComponentFixture<SingleDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonViewComponent } from './don-view.component';

describe('DonViewComponent', () => {
  let component: DonViewComponent;
  let fixture: ComponentFixture<DonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

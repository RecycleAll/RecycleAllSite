import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonItemComponent } from './don-item.component';

describe('DonItemComponent', () => {
  let component: DonItemComponent;
  let fixture: ComponentFixture<DonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

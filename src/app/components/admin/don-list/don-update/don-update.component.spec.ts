import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonUpdateComponent } from './don-update.component';

describe('DonUpdateComponent', () => {
  let component: DonUpdateComponent;
  let fixture: ComponentFixture<DonUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

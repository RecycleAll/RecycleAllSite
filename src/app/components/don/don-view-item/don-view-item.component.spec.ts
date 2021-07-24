import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonViewItemComponent } from './don-view-item.component';

describe('DonViewItemComponent', () => {
  let component: DonViewItemComponent;
  let fixture: ComponentFixture<DonViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonViewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

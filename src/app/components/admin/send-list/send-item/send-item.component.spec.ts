import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendItemComponent } from './send-item.component';

describe('SendItemComponent', () => {
  let component: SendItemComponent;
  let fixture: ComponentFixture<SendItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

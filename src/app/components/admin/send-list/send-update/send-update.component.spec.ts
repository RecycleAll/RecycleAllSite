import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendUpdateComponent } from './send-update.component';

describe('SendUpdateComponent', () => {
  let component: SendUpdateComponent;
  let fixture: ComponentFixture<SendUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

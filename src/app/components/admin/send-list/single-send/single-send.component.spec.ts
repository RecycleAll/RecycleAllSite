import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSendComponent } from './single-send.component';

describe('SingleSendComponent', () => {
  let component: SingleSendComponent;
  let fixture: ComponentFixture<SingleSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

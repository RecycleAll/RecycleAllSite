import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMediaTypeComponent } from './single-media-type.component';

describe('SingleMediaTypeComponent', () => {
  let component: SingleMediaTypeComponent;
  let fixture: ComponentFixture<SingleMediaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMediaTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMediaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

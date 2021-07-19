import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMediaTypeComponent } from './new-media-type.component';

describe('NewMediaTypeComponent', () => {
  let component: NewMediaTypeComponent;
  let fixture: ComponentFixture<NewMediaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMediaTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMediaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

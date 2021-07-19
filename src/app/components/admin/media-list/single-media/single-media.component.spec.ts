import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMediaComponent } from './single-media.component';

describe('SingleMediaComponent', () => {
  let component: SingleMediaComponent;
  let fixture: ComponentFixture<SingleMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

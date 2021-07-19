import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeUpdateComponent } from './media-type-update.component';

describe('MediaTypeUpdateComponent', () => {
  let component: MediaTypeUpdateComponent;
  let fixture: ComponentFixture<MediaTypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaTypeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

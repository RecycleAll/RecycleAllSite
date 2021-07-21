import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeItemComponent } from './media-type-item.component';

describe('MediaTypeItemComponent', () => {
  let component: MediaTypeItemComponent;
  let fixture: ComponentFixture<MediaTypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaTypeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

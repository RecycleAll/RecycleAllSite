import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEntrepotComponent } from './single-entrepot.component';

describe('SingleEntrepotComponent', () => {
  let component: SingleEntrepotComponent;
  let fixture: ComponentFixture<SingleEntrepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleEntrepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEntrepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

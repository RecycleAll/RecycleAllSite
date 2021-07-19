import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntrepotComponent } from './new-entrepot.component';

describe('NewEntrepotComponent', () => {
  let component: NewEntrepotComponent;
  let fixture: ComponentFixture<NewEntrepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEntrepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntrepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepotItemComponent } from './entrepot-item.component';

describe('EntrepotItemComponent', () => {
  let component: EntrepotItemComponent;
  let fixture: ComponentFixture<EntrepotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepotItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

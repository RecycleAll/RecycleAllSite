import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountUpdateComponent } from './my-account-update.component';

describe('MyAccountUpdateComponent', () => {
  let component: MyAccountUpdateComponent;
  let fixture: ComponentFixture<MyAccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxPermissionsComponent } from './checkbox-permissions.component';

describe('CheckboxPermissionsComponent', () => {
  let component: CheckboxPermissionsComponent;
  let fixture: ComponentFixture<CheckboxPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangepassFormComponent } from './user-changepass-form.component';

describe('UserChangepassFormComponent', () => {
  let component: UserChangepassFormComponent;
  let fixture: ComponentFixture<UserChangepassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangepassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangepassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

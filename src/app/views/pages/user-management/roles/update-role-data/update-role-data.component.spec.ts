import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoleDataComponent } from './update-role-data.component';

describe('UpdateRoleDataComponent', () => {
  let component: UpdateRoleDataComponent;
  let fixture: ComponentFixture<UpdateRoleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRoleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

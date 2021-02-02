import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';
import { UserManagementModule } from '../../user-management.module';

import { UpdateRoleDataComponent } from './update-role-data.component';

describe('UpdateRoleDataComponent', () => {
  let component: UpdateRoleDataComponent;
  let fixture: ComponentFixture<UpdateRoleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule ],
      providers: [IApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoleDataComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar UpdateRoleDataComponent', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IApiService, IPaginationService } from '@cms/core';
import { UserManagementModule } from '../../user-management.module';

import { RoleEditComponent } from './role-edit.component';

describe('RoleEditComponent', () => {
  let component: RoleEditComponent;
  let fixture: ComponentFixture<RoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule, RouterTestingModule ],
      providers: [ IApiService, IPaginationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEditComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar RoleEditComponent', () => {
    expect(component).toBeTruthy();
  });
});

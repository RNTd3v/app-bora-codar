import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';
import { UserManagementModule } from '../../user-management.module';

import { CreateRoleComponent } from './create-role.component';

describe('CreateRoleComponent', () => {
  let component: CreateRoleComponent;
  let fixture: ComponentFixture<CreateRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule ],
      providers: [IApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoleComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar CreateRoleComponent', () => {
    expect(component).toBeTruthy();
  });
});

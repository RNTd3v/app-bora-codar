import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IApiService, IConfigService } from '@cms/core';
import { UserManagementModule } from '../user-management.module';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule, RouterTestingModule ],
      providers: [ IApiService, IConfigService ] // TODO: Retirar quando for escrever os testes
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar UsersComponent', () => {
    expect(component).toBeTruthy();
  });
});

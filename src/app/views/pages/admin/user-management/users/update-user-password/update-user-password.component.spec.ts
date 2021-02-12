import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';
import { UserManagementModule } from '../../user-management.module';

import { UpdateUserPasswordComponent } from './update-user-password.component';

describe('UpdateUserPasswordComponent', () => {
  let component: UpdateUserPasswordComponent;
  let fixture: ComponentFixture<UpdateUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule ],
      providers: [ IApiService ] // TODO: Retirar quando for escrever os testes
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserPasswordComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar UpdateUserPasswordComponent', () => {
    expect(component).toBeTruthy();
  });
});

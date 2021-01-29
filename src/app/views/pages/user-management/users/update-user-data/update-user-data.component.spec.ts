import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';
import { UserManagementModule } from '../../user-management.module';

import { UpdateUserDataComponent } from './update-user-data.component';

describe('UpdateUserDataComponent', () => {
  let component: UpdateUserDataComponent;
  let fixture: ComponentFixture<UpdateUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule ],
      providers: [ IApiService ] // TODO: Retirar quando for escrever os testes
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserDataComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar UpdateUserDataComponent', () => {
    expect(component).toBeTruthy();
  });
});

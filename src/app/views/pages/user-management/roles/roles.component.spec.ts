import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IApiService, IConfigService } from '@cms/core';
import { UserManagementModule } from '../user-management.module';

import { RolesComponent } from './roles.component';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule, RouterTestingModule ],
      providers: [ IApiService, IConfigService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar RolesComponent', () => {
    expect(component).toBeTruthy();
  });
});

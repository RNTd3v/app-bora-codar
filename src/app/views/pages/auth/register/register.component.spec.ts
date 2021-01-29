import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAuthService } from '@cms/core';

import { RegisterComponent } from './register.component';

import { AuthModule } from '../auth.module';
import { Type } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthServiceMock;
  class AuthServiceMock implements IAuthService {
    login: jasmine.Spy = jasmine.createSpy('login');
    logout: jasmine.Spy = jasmine.createSpy('logout');
    registerUser: jasmine.Spy = jasmine.createSpy('registerUser');
    sessionIsValid: jasmine.Spy = jasmine.createSpy('sessionIsValid');
    token: string;
    companyID: string;
   }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AuthModule, RouterTestingModule ]
    })
    .overrideComponent(RegisterComponent, {
      set: {
        providers: [
          { provide: IAuthService, useClass: AuthServiceMock}
        ],
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get<AuthServiceMock>((IAuthService as unknown) as Type<AuthServiceMock>);
  });

  it('#constructor deve instanciar RegisterComponent', () => {
    expect(component).toBeTruthy();
  });
});

import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IAuthService } from '@cms/core';
import { ThemeModule } from '../theme.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
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
      imports: [ ThemeModule, RouterTestingModule ]
    })
    .overrideComponent(HeaderComponent, {
      set: {
        providers: [
          { provide: IAuthService, useClass: AuthServiceMock}
        ],
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get<AuthServiceMock>((IAuthService as unknown) as Type<AuthServiceMock>);
  });

  it('#constructor deve instanciar HeaderComponent', () => {
    expect(component).toBeTruthy();
  });
});

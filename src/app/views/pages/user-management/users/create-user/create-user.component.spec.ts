import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IApiService } from '@cms/core';
import { UserManagementModule } from '../../user-management.module';
import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let apiService: ApiServiceMock;
  class ApiServiceMock implements IApiService {
    get: jasmine.Spy = jasmine.createSpy('get');
    getAll: jasmine.Spy = jasmine.createSpy('getAll');
    post: jasmine.Spy = jasmine.createSpy('post');
    put: jasmine.Spy = jasmine.createSpy('put');
    patch: jasmine.Spy = jasmine.createSpy('patch');
    delete: jasmine.Spy = jasmine.createSpy('delete');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserManagementModule ],
      providers: [IApiService]
    })
    .overrideComponent(CreateUserComponent, {
      set: {
        providers: [
          { provide: IApiService, useClass: ApiServiceMock}
        ],
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get<ApiServiceMock>((IApiService as unknown) as Type<ApiServiceMock>);
  });

  it('#constructor deve instanciar CreateUserComponent', () => {
    expect(component).toBeTruthy();
  });
});

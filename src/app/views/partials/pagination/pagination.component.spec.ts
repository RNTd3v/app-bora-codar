import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IConfigService, QueryParamsModel, DictionaryFilter, QueryResultsModel } from '@cms/core';
import { Observable } from 'rxjs';
import { PartialsModule } from '..';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let configService: ConfigServiceMock;

  class ConfigServiceMock implements IConfigService {
    setTotalPage: jasmine.Spy = jasmine.createSpy('setTotalPage');
    applyDefaultValues: jasmine.Spy = jasmine.createSpy('applyDefaultValues');
    queryParams: QueryParamsModel;
    filter: DictionaryFilter;
    queryResults: QueryResultsModel;
    totalPage: Observable<number>;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PartialsModule ]
    })
    .overrideComponent(PaginationComponent, {
      set: {
        providers: [
          { provide: IConfigService, useClass: ConfigServiceMock}
        ],
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    configService = fixture.debugElement.injector.get<ConfigServiceMock>((IConfigService as unknown) as Type<ConfigServiceMock>);
  });

  it('#constructor deve instanciar PaginationComponent', () => {
    expect(component).toBeTruthy();
  });
});

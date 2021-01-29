import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IConfigService, QueryParamsModel, DictionaryFilter, QueryResultsModel } from '@cms/core';
import { Observable } from 'rxjs';
import { PartialsModule } from '..';
import { SearchComponent } from '../search/search.component';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
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
    .overrideComponent(TableComponent, {
      set: {
        providers: [
          { provide: IConfigService, useClass: ConfigServiceMock}
        ],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    configService = fixture.debugElement.injector.get<ConfigServiceMock>((IConfigService as unknown) as Type<ConfigServiceMock>);
  });

  it('#constructor deve instanciar TableComponent', () => {
    expect(component).toBeTruthy();
  });
});

import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IPaginationService, QueryParamsModel, DictionaryFilter, QueryResultsModel } from '@cms/core';
import { Observable } from 'rxjs';
import { PartialsModule } from '..';
import { SearchComponent } from '../search/search.component';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let PaginationService: ConfigServiceMock;
  class ConfigServiceMock implements IPaginationService {
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
          { provide: IPaginationService, useClass: ConfigServiceMock}
        ],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    PaginationService = fixture.debugElement.injector.get<ConfigServiceMock>((IPaginationService as unknown) as Type<ConfigServiceMock>);
  });

  it('#constructor deve instanciar TableComponent', () => {
    expect(component).toBeTruthy();
  });
});

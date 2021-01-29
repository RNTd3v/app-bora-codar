import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DictionaryFilter, IConfigService, QueryParamsModel, QueryResultsModel } from '@cms/core';
import { Observable } from 'rxjs';
import { PartialsModule } from '..';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
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
    .overrideComponent(SearchComponent, {
      set: {
        providers: [
          { provide: IConfigService, useClass: ConfigServiceMock}
        ],
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    configService = fixture.debugElement.injector.get<ConfigServiceMock>((IConfigService as unknown) as Type<ConfigServiceMock>);
  });

  it('#constructor deve instanciar SearchComponent', () => {
    expect(component).toBeTruthy();
  });
});

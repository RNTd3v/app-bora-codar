import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IPaginationService, QueryParamsModel, DictionaryFilter, QueryResultsModel } from '@cms/core';
import { Observable } from 'rxjs';
import { PartialsModule } from '..';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
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
    .overrideComponent(PaginationComponent, {
      set: {
        providers: [
          { provide: IPaginationService, useClass: ConfigServiceMock}
        ],
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    PaginationService = fixture.debugElement.injector.get<ConfigServiceMock>((IPaginationService as unknown) as Type<ConfigServiceMock>);
  });

  it('#constructor deve instanciar PaginationComponent', () => {
    expect(component).toBeTruthy();
  });
});

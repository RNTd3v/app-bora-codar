import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { IConfigService, Option, QueryParamsModel, TableAction } from '@cms/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input()
  isLoadingResults: boolean = true;

  @Input()
  dataSource: any[] = [];

  @Input()
  columns: Option[] = [];

  @Output()
  actionEvent = new EventEmitter();

  @Output()
  sortChangeEvent = new EventEmitter();

  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private configService: IConfigService) { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(column => column.id);
    this.displayedColumns.push('action');
  }

  action(data: any, type: 'edit' | 'delete'): void {
    this.actionEvent.emit({ data, type } as TableAction);
  }

  sortData(sort: Sort) {

    const { queryParams } = this.configService;

    this.configService.queryParams = {
      ...queryParams,
      sortBy: sort.active,
      order: sort.direction.toUpperCase()
    } as QueryParamsModel;

    this.sortChangeEvent.emit();

  }

}

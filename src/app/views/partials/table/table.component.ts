import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { IPaginationService, TableAction, QueryParamsModel, TableStatus, TableConfig, ButtonId, LoaderService } from '@cms/core';
import { environment } from '@cms/environment';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input()
  dataSource: any[] = [];

  @Input()
  config: TableConfig = undefined;

  @Output()
  actionEvent = new EventEmitter();

  @Output()
  sortChangeEvent = new EventEmitter();

  @Output()
  checkboxChangeEvent = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  isLoading$: Observable<boolean>;

  isLoadingResults = false;

  constructor(private PaginationService: IPaginationService, private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading.pipe(debounceTime(0));
  }

  ngOnInit(): void {

    this.displayedColumns = this.config.columns.map(column => column.id);
    this.displayedColumns.push('action');
  }

  action(data: any, buttonId: ButtonId, index: number): void {
    this.actionEvent.emit({ data, buttonId } as TableAction);
  }

  sortData(sort: Sort) {

    const { queryParams } = this.PaginationService;

    this.PaginationService.queryParams = {
      ...queryParams,
      sortBy: sort.active,
      order: sort.direction.toUpperCase()
    } as QueryParamsModel;

    this.sortChangeEvent.emit();

  }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  checkboxChange({ checked }, data): void {
    this.checkboxChangeEvent.emit({ checked, data } as TableStatus<any>);
  }

  tdWidth(width: string | undefined): string {
    return width ? width : 'max-content';
  }

  getChipsName(chips: any[]): string[] {
    return chips.map(chip => chip.name);
  }

}

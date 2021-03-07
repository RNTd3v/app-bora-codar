import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { IPaginationService, TableAction, QueryParamsModel, TableContentType, TableStatus, Option, TableMoreAction, ButtonConfig, TableConfig, ButtonId } from '@cms/core';
import { environment } from '@cms/environment';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges {

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

  private indexButtonAction: number;
  private indexCheckboxChange = 0;

  isLoadingResults = false;

  constructor(private PaginationService: IPaginationService) { }

  ngOnInit(): void {

    this.displayedColumns = this.config.columns.map(column => column.id);
    this.displayedColumns.push('action');
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!!changes && !!changes.isLoadingAction) {

      const { currentValue } = changes.isLoadingAction;

      if (!currentValue) {
        this.indexButtonAction = undefined;
      }
    }

  }

  action(data: any, buttonId: ButtonId, index: number): void {

    console.log(data);
    console.log(buttonId);



    this.indexButtonAction = index;
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

  isLoadingDeleteAction(index: number): boolean {
    return false //this.isLoadingAction && index === this.indexDeleteAction;
  }

  isLoadingMoreAction(index: number): boolean {
    return false //this.isLoadingAction && index === this.indexMoreAction;
  }

  getPathImage(image: string): string {
    return !!image ? `${environment.IMAGE_URL}${image}` : '/assets/icons/user.svg';
  }

  checkboxChange({ checked }, data, index: number): void {
    this.indexCheckboxChange = index;
    this.checkboxChangeEvent.emit({ checked, data } as TableStatus<any>);
  }

  isLoadingCheckboxChange(index: number): boolean {
    return false //this.isLoadingAction && index === this.indexCheckboxChange;
  }

  tdWidth(width: string | undefined): string {
    return width ? width : 'max-content';
  }

  getChipsName(chips: any[]): string[] {
    return chips.map(chip => chip.name);
  }

}

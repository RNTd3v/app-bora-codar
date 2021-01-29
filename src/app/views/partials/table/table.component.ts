import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { IConfigService, TableAction, QueryParamsModel, TableContentType, TableStatus, Option, TableMoreAction } from '@cms/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  isLoadingResults = true;

  @Input()
  isLoadingAction = false;

  @Input()
  dataSource: any[] = [];

  @Input()
  columns: Option[] = [];

  @Input()
  moreAction: TableMoreAction = null;

  @Output()
  actionEvent = new EventEmitter();

  @Output()
  sortChangeEvent = new EventEmitter();

  @Output()
  loadContentEvent = new EventEmitter();

  @Output()
  toggleChangeEvent = new EventEmitter();

  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContainer') elementView: ElementRef;

  private indexDeleteAction: number;
  private indexMoreAction: number;
  private indexToggleChange: number = 0;

  private readonly rowHeight = 48;

  constructor(private configService: IConfigService) { }


  ngOnInit(): void {
    this.displayedColumns = this.columns.map(column => column.id);
    this.displayedColumns.push('action');
  }

  ngAfterViewInit() {
    this.setPerPageConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!!changes && !!changes.isLoadingAction) {

      const { currentValue } = changes.isLoadingAction;

      if (!currentValue) {
        this.indexDeleteAction = undefined;
        this.indexMoreAction = undefined;
        this.indexToggleChange = undefined;
      }
    }

  }

  action(data: any, type: 'edit' | 'delete' | 'more', index: number): void {

    switch (type) {
      case 'delete':
        this.indexDeleteAction = index;
        break;
      case 'more':
        this.indexMoreAction = index;
        break;
      default:
        break;
    }

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

  isLoadingDeleteAction(index: number): boolean {
    return this.isLoadingAction && index === this.indexDeleteAction;
  }

  isLoadingMoreAction(index: number): boolean {
    return this.isLoadingAction && index === this.indexMoreAction;
  }

  defineContentType(data: any): TableContentType {

    switch (typeof data) {
      case 'object':
        return TableContentType.LIST;

      case 'boolean':
        return TableContentType.TOGGLE;

      default:
        return TableContentType.TEXT
    }

  }

  slideToggleChange({ checked }, data, index: number): void {
    this.indexToggleChange = index;
    this.toggleChangeEvent.emit({ checked, data } as TableStatus<any>);
  }

  isLoadingToggleChange(index: number): boolean {
    return this.isLoadingAction && index === this.indexToggleChange;
  }

  private setPerPageConfig(): void {

    const tableHeight = this.elementView.nativeElement.getBoundingClientRect().height;
    const perPage = Math.floor(tableHeight / this.rowHeight) - 1;

    const { queryParams } = this.configService;

    this.configService.queryParams = {
      ...queryParams,
      perPage
    } as QueryParamsModel;

    this.loadContentEvent.emit();
  }

}

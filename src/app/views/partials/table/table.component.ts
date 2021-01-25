import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { IConfigService, Option, QueryParamsModel, TableAction } from '@cms/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input()
  isLoadingResults = true;

  @Input()
  isLoadingAction = false;

  @Input()
  dataSource: any[] = [];

  @Input()
  columns: Option[] = [];

  @Output()
  actionEvent = new EventEmitter();

  @Output()
  sortChangeEvent = new EventEmitter();

  @Output()
  loadContentEvent = new EventEmitter();

  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContainer') elementView: ElementRef;

  private indexDeleteAction: number;

  private readonly rowHeight = 48;

  constructor(private configService: IConfigService) { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(column => column.id);
    this.displayedColumns.push('action');
  }

  ngAfterViewInit() {
    this.setPerPageConfig();
  }

  action(data: any, type: 'edit' | 'delete', index: number): void {
    this.indexDeleteAction = index;
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

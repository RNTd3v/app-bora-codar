import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IPaginationService, LoaderService } from '@cms/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

enum GoTo {
  FIRST_PAGE = 'FIRST_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  PAGE = 'PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  LAST_PAGE = 'LAST_PAGE'
}

@Component({
  selector: 'cms-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  @Output() changePage = new EventEmitter();

  isLoading$: Observable<boolean>;

  readonly defaultItemPerPage = 5;

  itemsPerPage = this.defaultItemPerPage;

  goTo = GoTo;

  constructor(private paginationService: IPaginationService, private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading.pipe(debounceTime(0));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.paginationService.applyDefaultValues(true);
  }

  changeItemsPerPage(): void {

    this.paginationService.applyDefaultValues();

    const { queryParams } = this.paginationService;

    this.paginationService.queryParams = {
      ...queryParams,
      perPage: this.itemsPerPage
    };

    this.changePage.emit();

  }

  handleClick(goTo: GoTo | number): void {

    const { page } = this.paginationService.queryParams;

    switch (goTo) {

      case 'PREVIOUS_PAGE':
        this.goToPage(page - 1);
        break;
      case 'NEXT_PAGE':
        this.goToPage(page + 1);
        break;

      default:
        break;

    }

  }

  private goToPage(page: number): void {

    const { queryParams } = this.paginationService;

    this.paginationService.queryParams = {
      ...queryParams,
      page
    };

    this.changePage.emit();

  }

  get rangeItems(): string {
    const currentTotal = this.perPage * this.currentPage;
    const currentInitial = (currentTotal - this.perPage) + 1;
    return `${currentInitial} - ${currentTotal > this.totalItems ? this.totalItems : currentTotal} de ${this.totalItems}`;
  }

  get hasPreviousPage(): boolean {
    return this.paginationService.queryResults.hasPreviousPage;
  }

  get hasNextPage(): boolean {
    return this.paginationService.queryResults.hasNextPage;
  }

  private get currentPage(): number {
    return this.paginationService.queryResults.page;
  }

  private get perPage(): number {
    return this.paginationService.queryResults.perPage;
  }

  get totalItems(): number {
    return this.paginationService.queryResults.totalItems;
  }

  private get totalPage(): number {
    return this.paginationService.queryResults.totalPage;
  }

  get itemsPerPageList(): number[] {
    const totalItems = Math.ceil(this.totalItems / this.defaultItemPerPage);
    return Array.from({ length: totalItems }, (_, k) => (k * this.defaultItemPerPage) + this.defaultItemPerPage);
  }

}

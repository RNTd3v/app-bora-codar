import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IConfigService } from '@cms/core';
import { first } from 'rxjs/operators';
enum GoTo {
  FIRST_PAGE = 'FIRST_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  PAGE = 'PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  LAST_PAGE = 'LAST_PAGE'
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnDestroy {

  @Output() changePage = new EventEmitter();

  private _currentPage = 1;
  private _pageNumbers = [];
  private _visiblePageNumbers = [];
  totalPage: number;
  goTo = GoTo;

  private readonly totalVisiblePageNumbers = 3;

  constructor(private configService: IConfigService) { }

  ngOnInit(): void {
    this.configService.totalPage
      .pipe(first())
        .subscribe(totalPage => {
          this.totalPage = totalPage;
          this.setPageNumbers(totalPage);
    });
  }

  ngOnDestroy(): void {
    this.configService.applyDefaultValues();
  }

  handleClick(goTo: GoTo | number): void {

    const { page } = this.configService.queryParams;

    switch (goTo) {

      case 'FIRST_PAGE':
        this.goToPage(1);
        break;
      case 'PREVIOUS_PAGE':
        this.goToPage(page - 1);
        break;
      case 'NEXT_PAGE':
        this.goToPage(page + 1);
        break;
      case 'LAST_PAGE':
        this.goToPage(this.totalPage);
        break;
      default:
        this.goToPage(goTo as number);
        break;

    }

  }

  private setPageNumbers(totalPage: number): void {
    for (let index = 0; index < totalPage; index++) {
      this._pageNumbers.push(index + 1);
    }
    this.setVisiblePageNumbers();
  }

  private setVisiblePageNumbers(start = 0, end = this.totalVisiblePageNumbers): void {
    this._visiblePageNumbers = this._pageNumbers.slice(start, end);
  }

  private goToPage(page: number): void {

    const { queryParams } = this.configService;

    this.configService.queryParams = {
      ...queryParams,
      page
    };

    this._currentPage = page;

    if (this.totalPage > this.totalVisiblePageNumbers) {
      this.handleVisiblePageNumbers(page);
    }

    this.changePage.emit();

  }

  private handleVisiblePageNumbers(page: number): void {

    let start = 0;
    let end = this.totalVisiblePageNumbers;

    if (page >= this.totalVisiblePageNumbers) {
      start = page - this.totalVisiblePageNumbers;
      end = page;
    }

    this.setVisiblePageNumbers(start, end);

  }

  get hasPreviousPage(): boolean {
    return this.configService.queryResults.hasPreviousPage;
  }

  get hasNextPage(): boolean {
    return this.configService.queryResults.hasNextPage;
  }

  get pageNumbers(): number[] {
    return this._visiblePageNumbers;
  }

  get showPagition(): boolean {
    return this.totalPage > 1;
  }

  currentPage(page: number): boolean {
    return this._currentPage === page;
  }

}

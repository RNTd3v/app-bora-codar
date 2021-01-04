import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IConfigService } from '@cms/core';

enum GoTo {
  FIRST_PAGE = 'FIRST_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  PAGE = 'PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  LAST_PAGE = 'LAST_PAGE'
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() changePage = new EventEmitter();

  private _currentPage = 1;

  constructor(private configService: IConfigService) { }

  ngOnInit(): void {}

  handleClick(goTo: GoTo | number): void {

    const { page } = this.configService.queryParams;
    const { totalPage } = this.configService.queryResults;

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
        this.goToPage(totalPage);
        break;
      default:
        this.goToPage(goTo as number);
        break;

    }

  }

  private goToPage(page: number): void {

    let { queryParams } = this.configService;

    this.configService.queryParams = {
      ...queryParams,
      page
    }

    this._currentPage = page;

    this.changePage.emit();

  }

  get hasPreviousPage(): boolean {
    return this.configService.queryResults.hasPreviousPage;
  }

  get hasNextPage(): boolean {
    return this.configService.queryResults.hasNextPage;
  }

  get totalPage(): number {
    return this.configService.queryResults.totalPage;
  }

  get pageList(): number[] {

    const list = [];
    const limit = this.totalPage > 5 ? 5 : this.totalPage;

    for (let index = 0; index < limit; index++) {
      list.push(index+1);
    }

    return list;
  }

  currentPage(pageIndex: number): boolean {
    return this._currentPage === pageIndex + 1;
  }



}

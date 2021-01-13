import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DictionaryFilter, Filter, IConfigService } from '@cms/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnChanges {

  @Input()
  filters = [] as Filter[];

  @Output()
  searchEvent = new EventEmitter();

  filterControl = new FormControl('', Validators.required);
  filteredOptions: Observable<Filter[]>;

  private time = null;

  constructor(private config: IConfigService) { }

  ngOnInit(): void {
    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(filter => filter ? this.filterKey(filter) : this.filters.slice())
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { filters } = changes;
    if (!!filters && filters.firstChange) {
      this.setFilterDefault();
    }
  }

  handleKeyUp(event): void {
    this.debounceEvent(event.target.value);
  }

  private setFilterDefault(): void {
    const { value } = this.filters[0] as Filter;
    this.filterControl.setValue(value);
  }

  private debounceEvent(value: string): void {

    const filterKey = this.filters
      .filter(f => f.value === this.filterControl.value)
      .map(f => f.key)[0];

    clearTimeout(this.time);

    this.time = setTimeout(() => {
      this.config.filter = !!value ? { [filterKey]: value} : {} as DictionaryFilter;
      this.searchEvent.emit();
    }, 1000);

  }

  private filterKey(filter: string): Filter[] {
    const filterValue = filter.toLowerCase();
    return this.filters.filter(filter => filter.value.toLowerCase().indexOf(filterValue) === 0);
  }

  get disabledSearchField(): boolean {
    return this.filterControl.invalid;
  }

}

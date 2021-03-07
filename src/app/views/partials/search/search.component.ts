import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FilterOptions, IPaginationService, DictionaryFilter } from '@cms/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'cms-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnChanges {

  @Input()
  filters = [] as FilterOptions[];

  @Output()
  searchEvent = new EventEmitter();

  filterControl = new FormControl('', Validators.required);
  filteredOptions: Observable<FilterOptions[]>;

  private time = null;

  constructor(private config: IPaginationService) { }

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
    const { name } = this.filters[0] as FilterOptions;
    this.filterControl.setValue(name);
  }

  private debounceEvent(value: string): void {

    const filterKey = this.filters
      .filter(f => f.name === this.filterControl.value)
      .map(f => f.id)[0];

    clearTimeout(this.time);

    this.time = setTimeout(() => {
      this.config.filter = !!value ? { [filterKey]: value} : {} as DictionaryFilter;
      this.searchEvent.emit();
    }, 1000);

  }

  private filterKey(filter: string): FilterOptions[] {
    const filterValue = filter.toLowerCase();
    return this.filters.filter(f => f.name.toLowerCase().indexOf(filterValue) === 0);
  }

  get disabledSearchField(): boolean {
    return this.filterControl.invalid;
  }

}

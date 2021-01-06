import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { User, IUserService, IConfigService, DictionaryFilter } from '@cms/core';
import { DialogDeleteComponent } from '@cms/partials';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';

export interface Filter {
  key: string;
  value: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[]

  displayedColumns = ['foto', 'nome', 'email', 'acao'];

  filters = [
    { key: 'name', value: 'Nome' },
    { key: 'email', value: 'E-mail' }
  ];

  filterControl = new FormControl('Nome', Validators.required);
  filteredOptions: Observable<Filter[]>;

  dictionaryFilter = {} as DictionaryFilter;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  time = null;

  private subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private config: IConfigService,
    public dialog: MatDialog,
    private service: IUserService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(filter => filter ? this.filterKey(filter) : this.filters.slice())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllUsers(): void {

    this.isLoadingResults = true;

    this.subscription.add(
      this.service.getAllUsers()
        .pipe(finalize(() => this.isLoadingResults = false))
        .subscribe(users => this.users = users)
    );

  }

  addUser(): void {
    this.router.navigate(['user-management/users/add']);
  }

  editUser(user: User): void {
    this.router.navigate([`user-management/users/${user.id}`]);
  }

  deleteUser(user: User): void {

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: {name: user.name, title: 'Deletar usuário'}
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.subscription.add(
          this.service.deleteUser(user.id)
            .subscribe(response => console.log(response))
        )
      }
    });
  }

  handleKeyUp(event): void {
    this.debounceEvent(event.target.value);
  }

  private debounceEvent(value: string): void {

    const filterKey = this.filters
      .filter(f => f.value === this.filterControl.value)
      .map(f => f.key)[0];

    clearTimeout(this.time);

    this.time = setTimeout(() => {
      this.config.filter = !!value ? { [filterKey]: value} : {} as DictionaryFilter;
      this.getAllUsers();
    }, 1000);

  }

  private filterKey(filter: string): Filter[] {
    const filterValue = filter.toLowerCase();
    console.log(filterValue);
    return this.filters.filter(filter => filter.value.toLowerCase().indexOf(filterValue) === 0);
  }

  get disabledSearchField(): boolean {
    return this.filterControl.invalid;
  }

}

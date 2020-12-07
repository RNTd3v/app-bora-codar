
import {Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  displayedColumns: string[] = ['foto', 'nome', 'perfil', 'acao'];
  data: User[] = [{
    foto: '',
    nome: 'Renato',
    perfil: 'Admin',
    email: ''
  }];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

}

export interface Users {
  items: User[];
  total_count: number;
}

export interface User {
  foto: string;
  nome: string;
  email: string;
  perfil: string;
}


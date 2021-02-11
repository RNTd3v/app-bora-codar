import { Component, OnInit } from '@angular/core';
import { IAuthService, User } from '@cms/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private authService: IAuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData;
  }

}

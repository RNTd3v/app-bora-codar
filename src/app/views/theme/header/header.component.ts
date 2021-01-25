import { Component, OnInit } from '@angular/core';
import { IAuthService } from '@cms/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: IAuthService) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

}

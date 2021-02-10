import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cms-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  @Input() asideIsClosed = false;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  get textLogo(): string {
    return this.asideIsClosed ? '/b' : '/bora.codar';
  }

}

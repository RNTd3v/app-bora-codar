import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() prefix = 'fas';
  @Input() name: string;
  @Input() size = '1.2rem';

}

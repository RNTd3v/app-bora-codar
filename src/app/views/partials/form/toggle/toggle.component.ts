import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'cms-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() isChecked = false;
  @Output() changeCheckedFn = new EventEmitter();
  @ViewChild('inputCheckbox') inputCheckbox!: ElementRef;

  constructor() { }

  ngOnInit(): void {}

  changeValue(): void {
    this.changeCheckedFn.emit(this.inputCheckbox.nativeElement.checked);
  }

}

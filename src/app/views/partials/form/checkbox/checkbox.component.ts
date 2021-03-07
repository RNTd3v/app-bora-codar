import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'cms-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() isChecked = false;
  @Output() changeCheckedFn = new EventEmitter();
  @ViewChild('inputCheckbox') inputCheckbox!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isChecked);

  }

  changeValue(): void {
    this.changeCheckedFn.emit(this.inputCheckbox.nativeElement.checked);
  }

}

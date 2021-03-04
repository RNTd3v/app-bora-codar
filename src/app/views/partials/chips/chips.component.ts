import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  @Input() chips: string[] = [];
  @Input() showTrashButton = false;
  @Input() limitToView: number | null = null;

  @Output() deleteChipFn = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  deleteChip(index: number): void {
    if (this.showTrashButton) {
      this.deleteChipFn.emit(index);
    }
  }

  get listChips(): string [] {
    return this.limitToView ? this.chips.slice(this.limitToView) : this.chips;
  }

  get showChipMore(): boolean {
    return this.limitToView ? this.chips.length > this.limitToView : false;
  }

  get numberMore(): string {
    return `+${this.chips.length - this.limitToView}`;
  }

}

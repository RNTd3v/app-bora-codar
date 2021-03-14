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

  listChips(): string [] {
    if (this.hasChips()) {
      return this.limitToView ? this.chips.slice(0, this.limitToView) : this.chips;
    }
    return [];
  }

  showChipMore(): boolean {
    if (this.hasChips()) {
      return this.limitToView ? this.chips.length > this.limitToView : false;
    }
    return false
  }

  numberMore(): string {
    if (this.hasChips()) {
      return `+${this.chips.length - this.limitToView}`;
    }
    return '';
  }

  private hasChips(): boolean {
    return this.chips && this.chips.length > 0;
  }

}

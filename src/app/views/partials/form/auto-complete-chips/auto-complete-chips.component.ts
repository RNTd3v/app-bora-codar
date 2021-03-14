import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-chips',
  templateUrl: './auto-complete-chips.component.html',
  styleUrls: ['./auto-complete-chips.component.scss']
})
export class AutoCompleteChipsComponent implements OnInit {

  @Input() label: string;
  @Input() list: any[] = [];
  @Input() chips: string[] = [];
  @Input() textInput = 'Adicionar ...';

  @Output()
  handleAddedAChip = new EventEmitter();

  @Output()
  handleRemovingAChip = new EventEmitter();

  chipControl = new FormControl();
  filteredOptions: Observable<string[]>;

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  private textInputChip = this.textInput;

  constructor() { }

  ngOnInit(): void {
    this.setFilterOptions();
    this.handleWhenAllChipsAreAdded();
  }

  addChip(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.chips.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.chipControl.setValue(null);

  }

  removeChip(index: number): void {

    // const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.remove(index);
    }

    this.enabledInputAutoComplete();

  }

  selectedChip(event: MatAutocompleteSelectedEvent): void {

    const chip = event.option.viewValue;

    if (!this.chipAlreadyAdded(chip)) {
      this.add(chip);
    }

    this.handleWhenAllChipsAreAdded();
    this.resetChipControl();

  }

  private setFilterOptions(): void {
    this.filteredOptions = this.chipControl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filter(name) : this.list.slice())
      );
  }

  private filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.list.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private add(chip: string): void {
    this.chips.push(chip);
    this.handleAddedAChip.emit(chip);
  }

  private remove(index: number): void {
    this.chips.splice(index, 1);
    this.handleRemovingAChip.emit(index);
  }

  private resetChipControl(): void {
    this.chipInput.nativeElement.value = '';
    this.chipControl.setValue(null);
  }

  private disabledInputAutoComplete(): void {
    this.chipControl.disable();
    this.textInputChip = '';
  }

  private enabledInputAutoComplete(): void {
    this.textInputChip = this.textInput;
    this.chipControl.enable();
  }

  private handleWhenAllChipsAreAdded(): void {

    if (this.list.length === this.chips.length) {
      this.disabledInputAutoComplete();
      return;
    }

    this.enabledInputAutoComplete();
  }

  private chipAlreadyAdded(chipName: string): boolean {
    return this.chips.some(chip => chip === chipName);
  }

  get placeholder(): string {
    return this.textInputChip;
  }

}

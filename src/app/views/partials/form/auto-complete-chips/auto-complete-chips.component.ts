import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { FieldConfig } from '@cms/core';

@Component({
  selector: 'app-auto-complete-chips',
  templateUrl: './auto-complete-chips.component.html',
  styleUrls: ['./auto-complete-chips.component.scss']
})
export class AutoCompleteChipsComponent implements OnInit {

  // @Input() title: string;
  // @Input() list: any[] = [];
  // @Input() chips: string[] = [];
  // @Input() textInput = 'Adicionar ...';

  field: FieldConfig;
  group: FormGroup;

  @Output()
  handleAddedAChip = new EventEmitter();

  @Output()
  handleRemovingAChip = new EventEmitter();

  chipControl = new FormControl();
  filteredOptions: Observable<string[]>;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  private textInputChip = '';

  constructor() { }

  ngOnInit(): void {
    this.setFilterOptions();
    this.handleWhenAllChipsAreAdded();
    this.textInputChip = this.field.placeholder;
  }

  addChip(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.field.chipsName.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.chipControl.setValue(null);

  }

  removeChip(chip: string): void {

    const index = this.field.chipsName.indexOf(chip);

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
        map(name => name ? this.filter(name) : this.field.chips.slice())
      );
  }

  private filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.field.chips.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private add(chip: string): void {
    this.field.chipsName.push(chip);
    this.handleAddedAChip.emit(chip);
  }

  private remove(index: number): void {
    this.field.chipsName.splice(index, 1);
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
    this.textInputChip = this.field.placeholder;
    this.chipControl.enable();
  }

  private handleWhenAllChipsAreAdded(): void {

    if (this.field.chips.length === this.field.chipsName.length) {
      this.disabledInputAutoComplete();
      return;
    }

    this.enabledInputAutoComplete();
  }

  private chipAlreadyAdded(chipName: string): boolean {
    return this.field.chipsName.some(chip => chip === chipName);
  }

  get placeholder(): string {
    return this.textInputChip;
  }

}

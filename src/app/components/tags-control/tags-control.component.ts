import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tags-control',
  templateUrl: './tags-control.component.html',
  styleUrls: ['./tags-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsControlComponent,
      multi: true
    }
  ]
})
export class TagsControlComponent implements ControlValueAccessor {

  value: boolean;

  constructor() {
  }

  onChange: any = (val: boolean) => {
  };

  writeValue(state: boolean): void {
    this.value = state;
    this.onChange(state);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean) {
  }

  toggleValue(): void {
    this.value = !this.value;
    this.onChange(this.value);
  }
}

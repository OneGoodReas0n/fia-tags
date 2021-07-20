import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../tags-input/tags-input.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tags-suggestions-list',
  templateUrl: './tags-suggestions-list.component.html',
  styleUrls: ['./tags-suggestions-list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TagsSuggestionsListComponent,
    multi: true
  }]
})
export class TagsSuggestionsListComponent implements OnInit, ControlValueAccessor {

  @Output() ionPushTag: EventEmitter<Tag> = new EventEmitter<Tag>();

  @Input() inputValue: string;
  @Input() valid: boolean;
  @Input() suggestions: Array<Tag>;

  onChange: (suggestions: Array<Tag>) => void;

  constructor() {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(values: Array<Tag>): void {
    this.suggestions = values;
  }

  public addTagByBtn(tag: Tag): void {
    this.ionPushTag.emit(tag);
    this.suggestions = this.suggestions.filter(s => s !== tag);
    this.onChange(this.suggestions);
  }
}

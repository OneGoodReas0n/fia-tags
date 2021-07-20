import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../tags-input/tags-input.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsListComponent,
      multi: true
    }
  ]
})
export class TagsListComponent implements OnInit, ControlValueAccessor {

  @Input() isInputOpen: boolean;
  @Input() savedTags: string | Array<Tag>;

  onChange: (tags: Array<Tag>) => void;

  tags: Array<Tag>;

  constructor() {
  }

  ngOnInit() {
    if (typeof (this.savedTags) === 'string') {
      const saved = this.savedTags.split(',');
      this.tags = saved.map(e => ({name: e.trim()}));
    } else {
      this.tags = this.savedTags as Array<Tag>;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(tags: Array<Tag>): void {
    this.tags = tags;
  }

  setDisabledState(isDisabled: boolean) {

  }

  removeTag($index: number) {
    if (this.tags.length > 0
    ) {
      if ($index === -1) {
        const removedTag = this.tags.pop();
      } else {
        this.tags.splice($index, 1);
      }
    }
    this.onChange(this.tags);
  }

  addTag(tag: Tag) {
    this.tags.push(tag);
  }
}

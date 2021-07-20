import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
} from '@angular/core';
import {Platform} from '@ionic/angular';
import {TagsService} from '../../services/tags.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface Tag {
  sharedId?: string;
  name: string;
}

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsInputComponent,
      multi: true
    }
  ]
})
export class TagsInputComponent implements OnInit, ControlValueAccessor {

  @Output() ionOnPushTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Output() ionOnRemoveTag: EventEmitter<number> = new EventEmitter<number>();
  @Output() ionBlur: EventEmitter<any> = new EventEmitter<any>();

  @Input() mode: 'ios' | 'md' = 'ios';
  @Input() addedTags: Array<Tag>;
  @Input() suggestions: Array<Tag>;
  onChange: (val: string) => void;
  onTouched: () => void;

  inputValue = '';

  constructor(private plt: Platform, private service: TagsService) {
  }

  writeValue(value: string): void {
    this.inputValue = value;
  }

  setValue(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
    this.onChange(this.inputValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.nativeDoneLister();
  }

  public nativeDoneLister(): void {
    this.plt.keyboardDidShow.subscribe(event => {
      if (event.code === 'done') {
        this.addTagByInput();
      }
    });
  }

  public addTagByInput(): void {
    if (this.inputValue.length === 0) {
      this.inputValue = '';
      return;
    }
    const tagName = this.inputValue.trim();
    if (!this.addedTags.map(t => t.name).includes(tagName)) {
      const tag: Tag = {name: tagName};
      this.ionOnPushTag.emit(tag);
    }
  }

  public onBackspace(): void {
    if (this.inputValue.length === 0 && this.addedTags.length > 0) {
      this.ionOnRemoveTag.emit(-1);
    }
  }
}

import {
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TagsService} from '../../services/tags.service';
import {Platform} from '@ionic/angular';

export interface Tag {
  sharedID?: string;
  name: string;
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags-component.html',
  styleUrls: ['./tags-component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsComponent,
      multi: true
    }
  ]
})
export class TagsComponent implements OnInit, ControlValueAccessor {

  @Output() ionPushTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Output() ionRemoveTag: EventEmitter<number> = new EventEmitter<number>();
  @Output() ionOnBlur: EventEmitter<void> = new EventEmitter<void>();
  @Input() isInputOpen: boolean;
  @Input() mode: 'ios' | 'md' = 'ios';
  @Input() maxInputLength: number;
  @Input() maxTagsLength: number;
  @Input() errors: any;

  @ViewChild('tagsInput', {read: ElementRef}) input: ElementRef;

  onChange: (tags: Array<Tag>) => void;
  onTouch: () => void;
  inputValue = '';
  tags: Array<Tag> = [];
  suggestions: Array<Tag> = [];
  isInputValid = true;
  isInputFocused = false;
  isSuggestionItemClicked = false;

  constructor(private service: TagsService, private plt: Platform) {
  }

  async ngOnInit(){
    await this.service.init();
    this.tags = this.service.tags;
    this.suggestions = this.filterSuggestions(this.service.suggestions, this.tags);
    this.nativeDoneLister();
  }

  writeValue(tags: Array<Tag>): void {
    this.tags = tags;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public nativeDoneLister(): void {
    this.plt.keyboardDidShow.subscribe(event => {
      if (event.code === 'done') {
        this.addTagByInput();
      }
    });
  }

  public onBlur() {
    setTimeout(() => {
      if (!this.isSuggestionItemClicked) {
        this.ionOnBlur.emit();
        this.isInputFocused = false;
      }
      this.isSuggestionItemClicked = false;
    }, 100);
  }

  public filterSuggestions(suggestions: Array<Tag>, addedTags: Array<Tag>) {
    return suggestions.filter(e => !addedTags.map(tag => tag.name).includes(e.name));
  }

  public async pushTag(tag: Tag): Promise<void> {
    if (this.tags.length < this.maxTagsLength) {
      await this.service.pushTag(tag);
      this.tags = this.service.tags;
      this.onChange(this.tags);
      this.inputValue = '';
      this.suggestions = this.filterSuggestions(this.service.suggestions, this.tags);
    }
  }

  public async removeTag(index: number): Promise<void> {
    if (this.tags.length > 0
    ) {
      await this.service.removeTag(index);
      this.tags = this.service.tags;
      this.onChange(this.tags);
      this.suggestions = this.filterSuggestions(this.service.suggestions, this.tags);
    }
  }

  public async addTagByInput(): Promise<void> {
    const value = this.inputValue.trim();
    if (value.length > 0) {
      if (!this.tags.map(t => t.name).includes(value)) {
        await this.service.pushTag({name: value});
        this.tags = this.service.tags;
        this.onChange(this.tags);
      }
      this.inputValue = '';
    }

  }

  public async addTagFromSuggestions(tag: Tag): Promise<void> {
    await this.service.pushTag(tag);
    this.isSuggestionItemClicked = true;
    this.tags = this.service.tags;
    this.onChange(this.tags);
    this.suggestions = this.filterSuggestions(this.service.suggestions, this.tags);
  }

  public async removeByBackspace(): Promise<void> {
    if (this.inputValue.length === 0 && this.tags.length > 0) {
      await this.service.removeTag(-1);
      this.tags = this.service.tags;
      this.suggestions = this.filterSuggestions(this.service.suggestions, this.tags);
    }
  }

  public validateInput(event: Event) {
    const {value} = (event.target as HTMLInputElement);
    this.isInputValid = value.length <= this.maxInputLength;
  }

  public focusIn() {
    console.log('Focus input');
    this.isInputFocused = true;
  }

  public focusOut() {
    console.log('Input lost focus');
    setTimeout(() => {
      this.isInputFocused = false;
      if (this.isSuggestionItemClicked) {
        this.setFocusInput();
      }
    });
  }

  public setFocusInput() {
    this.input.nativeElement.setFocus();
  }

  touchStart() {
    console.log('Touchstart');
  }

  touchEnd() {
    console.log('Touchend');
  }
}

import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
})
export class TagsInputComponent {

  @Output() ionOnOpenInput: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ionBlur: EventEmitter<any> = new EventEmitter<any>();

  @Input() maxTags: number;
  @Input() mode: 'ios' | 'md' = 'ios';
  @Input() isInputOpen: boolean;
  @Input() inputValue = '';

  tags: Array<string> = ['test1', 'test2'];
  suggestions: Array<string> = ['sommer', 'garten', 'urlaub', 'test1', 'test2'];
  suggestList: Array<string> = this.suggestions;


  constructor(private plt: Platform) {
    this.nativeDoneLister();
  }

  public nativeDoneLister(): void {
    this.plt.keyboardDidShow.subscribe(event => {
      if (event.code === 'done') {
        this.addTagByInput();
      }
    });
    this.suggestList = this.suggestions.filter((item) => !this.tags.includes(item));
  }

  public addTagByInput(): void {
    if (this.inputValue.length === 0 || this.tags.length >= this.maxTags
    ) {
      this.inputValue = '';
      return;
    }
    const tag = this.inputValue.trim();
    this.tags.push(tag);
    this.suggestions.push(tag);
    this.inputValue = '';
  }

  public addTagByBtn(name: string): void {
    this.tags.push(name);
    this.suggestList = this.suggestList.filter(el => el !== name);
    this.inputValue = '';
  }

  public onBackspace(): void {
    if (this.inputValue.length === 0 && this.tags.length > 0) {
      this.removeTag(-1);
    }
  }

  public returnToSuggestsList(tag: string): void {
    if (this.suggestList.indexOf(tag) === -1) {
      this.suggestList.push(tag);
    }
  }

  public removeTag($index: number): void {
    if (this.tags.length > 0
    ) {
      if ($index === -1) {
        const removedTag = this.tags.pop();
        this.returnToSuggestsList(removedTag);
      } else {
        this.returnToSuggestsList(this.tags[$index]);
        this.tags.splice($index, 1);
      }
    }
  }

  public onFocusOut(): void {
    if (this.isInputOpen) {
      setTimeout(()=>{
        this.ionOnOpenInput.emit(false);
      });

    }
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tag} from '../tags/tags-component';

@Component({
  selector: 'app-tags-suggestions',
  templateUrl: './tags-suggestions.component.html',
  styleUrls: ['./tags-suggestions.component.scss'],
})
export class TagsSuggestionsComponent {

  @Output() ionPushTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Input() showSuggestionList: boolean;
  @Input() inputValue: string;
  @Input() suggestions: Array<Tag>;

  addTagByBtn(tag: Tag) {
    this.ionPushTag.emit(tag);
  }
}

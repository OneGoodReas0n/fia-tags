import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tag} from '../tags/tags-component';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
})
export class TagsListComponent {

  @Input() savedTags: Array<Tag>;
  @Input() showControl: boolean;
  @Output() ionRemoveFromTags: EventEmitter<number> = new EventEmitter<number>();

  removeTag($index: number) {
    if (this.savedTags.length > 0
    ) {
      this.ionRemoveFromTags.emit($index);
    }
  }
}

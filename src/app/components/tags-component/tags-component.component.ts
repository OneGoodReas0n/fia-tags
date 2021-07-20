import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TagsService} from '../../services/tags.service';
import {Tag} from '../tags-input/tags-input.component';

@Component({
  selector: 'app-tags-component',
  templateUrl: './tags-component.component.html',
  styleUrls: ['./tags-component.component.scss'],
})
export class TagsComponentComponent implements OnInit {

  @Output() ionFocusOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  isSubmitted = false;
  form: FormGroup;
  tags: Array<Tag>;
  suggestions: Array<Tag>;

  constructor(private service: TagsService) {
    this.tags = service.tags;
    this.suggestions = service.suggestions;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      tagsControl: new FormControl(false),
      tagsInput: new FormControl('', [Validators.maxLength(32)]),
      tagsList: new FormControl(this.tags, [Validators.maxLength(10)]),
      tagsSuggestionsList: new FormControl(this.suggestions)
    });
  }

  pushTag(tag: Tag) {
    if(this.form.controls.tagsInput.valid){
      this.tags.push(tag);
      this.suggestions = this.service.suggestions.filter((item) => !this.tags.map(t => t.name).includes(item.name));
      this.form.controls.tagsInput.setValue('');
    }
    else{
      console.log('Error');
    }
  }

  removeTag(index: number) {
    if (this.tags.length > 0
    ) {
      if (index === -1) {
        const removedTag = this.tags.pop();
        this.returnToSuggestsList(removedTag);
      } else {
        this.returnToSuggestsList(this.tags[index]);
        this.tags.splice(index, 1);
      }
      this.form.get('tagsSuggestionsList').setValue(this.suggestions);
    }
  }

  public returnToSuggestsList(tag: Tag): void {
    if (this.suggestions.indexOf(tag) === -1) {
      this.suggestions.push(tag);
    }
  }

  onFocusOut() {
    setTimeout(() => {
      this.form.get('tagsControl').setValue(false);
      this.form.get('tagsInput').setValue('');
    });
  }

  submit() {
    console.log(this.form.value);
    console.log(this.form.controls.tagsInput.valid);
    this.isSubmitted = true;
  }
}

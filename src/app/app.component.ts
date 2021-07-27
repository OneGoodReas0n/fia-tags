import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {maxTagsValidator} from './directives/max-tags.directive';
import {TagsService} from './services/tags.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isInputOpen = false;
  form: FormGroup;

  constructor(private service: TagsService) {
  }

  public ngOnInit() {
    this.form = new FormGroup({
      tags: new FormControl([], [maxTagsValidator(10)]),
    });
  }

  toggleValue(): void {
    this.isInputOpen = !this.isInputOpen;
  }

  blur() {
    this.isInputOpen = false;
  }

  submit() {
    console.log(this.form.controls.tags);
  }
}

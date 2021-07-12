import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isTagInputOpen = false;

  toggleInput() {
    this.isTagInputOpen = !this.isTagInputOpen;
  }

  updateIsTagInputOpen(state: boolean) {
    this.isTagInputOpen = state;
  }
}

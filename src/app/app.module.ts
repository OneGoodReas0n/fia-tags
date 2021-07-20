import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {TagsInputComponent} from './components/tags-input/tags-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from './pipes/filter.pipe';
import {FocusDirective} from './directives/focus.directive';
import {TagsControlComponent} from './components/tags-control/tags-control.component';
import {TagsListComponent} from './components/tags-list/tags-list.component';
import {TagsComponentComponent} from './components/tags-component/tags-component.component';
import {TagsSuggestionsListComponent} from './components/tags-suggestions-list/tags-suggestions-list.component';

@NgModule({
  declarations: [AppComponent, TagsInputComponent, FilterPipe, FocusDirective, TagsControlComponent, TagsListComponent, TagsComponentComponent, TagsSuggestionsListComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}

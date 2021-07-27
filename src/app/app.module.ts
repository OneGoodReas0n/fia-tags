import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from './pipes/filter.pipe';
import {FocusDirective} from './directives/focus.directive';
import {TagsListComponent} from './components/tags-list/tags-list.component';
import {TagsComponent} from './components/tags/tags-component';
import {TagsSuggestionsComponent} from './components/tags-suggestions/tags-suggestions.component';

@NgModule({
    declarations: [AppComponent, FilterPipe, FocusDirective, TagsListComponent, TagsComponent, TagsSuggestionsComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule, IonicStorageModule.forRoot()],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}

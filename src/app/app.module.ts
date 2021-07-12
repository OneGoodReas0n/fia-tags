import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {TagsInputComponent} from './components/tags-input/tags-input.component';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from "./pipes/filter.pipe";
import {FocusDirective} from "./directives/focus.directive";

@NgModule({
  declarations: [AppComponent, TagsInputComponent, FilterPipe, FocusDirective],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}

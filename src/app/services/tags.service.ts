import {Injectable} from '@angular/core';
import {Tag} from '../components/tags-input/tags-input.component';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tags: Array<Tag> = [{name: 'test1'}, {name: 'test2'}];
  suggestions: Array<Tag> = [{name: 'sommer'}, {name: 'garten'}, {name: 'urlaub'}];
  private storage: Storage | null = null;

  constructor() {

  }

  pushTag(tag: Tag){
    this.tags.push(tag);
  }

  removeTag($index: number){

  }
}

import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Tag} from '../components/tags/tags-component';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tags: Array<Tag>;
  suggestions: Array<Tag>;

  constructor(private storage: Storage) {
  }

  public async init() {
    await this.storage.create();
    this.tags = await this.getTagsForObservation();
    this.suggestions = await this.getSuggestionsForObservation();
    if(this.suggestions.length === 0){
      await this.setFakeSuggestions();
    }
  }

  public async getTagsForObservation(): Promise<Array<Tag>> {
    const addedTags: Array<Tag> = await this.storage.get('tags');
    if (addedTags) {
      return addedTags;
    }
    return [];
  }

  public async pushTag(tag: Tag) {
    this.tags.push(tag);
    await this.storage.set('tags', this.tags);
    if(!this.suggestions.includes(tag)){
      this.suggestions.push(tag);
      await this.storage.set('suggestions', this.suggestions);
    }
  }

  public async removeTag($index: number) {
    this.tags.splice($index, 1);
    await this.storage.set('tags', this.tags);
  }

  public async setFakeSuggestions(): Promise<void> {
    const suggestions = [{name: 'test1'}, {name: 'test2'}, {name: 'sommer'}, {name: 'garten'}, {name: 'urlaub'}];
    this.storage.set('suggestions', suggestions);
  }

  private async getSuggestionsForObservation(): Promise<Array<Tag>> {
    const suggestions: Array<Tag> = await this.storage.get('suggestions');
    if (suggestions) {
      return suggestions;
    }
    return [];
  }
}

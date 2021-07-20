import {Pipe, PipeTransform} from '@angular/core';
import {Tag} from '../components/tags-input/tags-input.component';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(tags: Array<Tag>, search: string = ''): Array<Tag> {
    if (!search.trim()) {
      return tags;
    }
    return tags.filter(el => el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

}

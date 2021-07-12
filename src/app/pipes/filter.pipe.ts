import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(tags: string[], search: string = ''): Array<string> {
    if (!search.trim()) {
      return tags;
    }
    return tags.filter(el => el.startsWith(search));
  }

}

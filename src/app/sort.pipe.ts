import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from "./user.model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: UserModel[]) {
    return value.sort((a, b) => a.name.split(' ')[1].localeCompare(b.name.split(' ')[1]));
  }

}

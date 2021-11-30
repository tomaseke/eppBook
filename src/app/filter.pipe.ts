import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from "./user.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: UserModel[], name:string) {
    return value.filter(consultant => consultant.name.toLowerCase().includes(name.toLowerCase()));
  }

}

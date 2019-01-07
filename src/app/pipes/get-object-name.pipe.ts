import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObjectName'
})
export class GetObjectNamePipe implements PipeTransform {

  transform(objects: any) {
    let names: Array<string> = new Array();
    objects.forEach(obj => {
      names.push(obj.name);
    })
    return names;
  }


}

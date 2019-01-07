import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetObjectNamePipe } from '../get-object-name.pipe';

@NgModule({
  declarations: [GetObjectNamePipe],
  imports: [
    CommonModule
  ],
  exports : [
    GetObjectNamePipe
  ]
})
export class PipesCommonModule { }

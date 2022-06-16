import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceHolder]',
  exportAs: 'placed'
})
export class PlaceHolderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { 
  }

}

import { Directive } from '@angular/core';

@Directive({
  selector: '[sarPage],sar-page',
  host: {
    class: 'sar-page'
  }
})
export class PageDirective {

  constructor() { }

}

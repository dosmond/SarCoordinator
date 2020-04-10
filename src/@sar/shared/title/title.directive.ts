import { Directive } from '@angular/core';

@Directive({
  selector: '[sarTitle],sar-title',
  host: {
    class: 'sar-title'
  }
})
export class TitleDirective {

  constructor() { }

}

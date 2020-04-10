import { Directive } from '@angular/core';

@Directive({
  selector: '[sarPageLayoutContent],sar-page-layout-content',
  host: {
    class: 'sar-page-layout-content'
  }
})
export class PageLayoutContentDirective {

  constructor() { }

}

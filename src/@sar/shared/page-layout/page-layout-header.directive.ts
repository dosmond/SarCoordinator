import { Directive } from '@angular/core';

@Directive({
  selector: '[sarPageLayoutHeader],sar-page-layout-header',
  host: {
    class: 'sar-page-layout-header'
  }
})
export class PageLayoutHeaderDirective {

  constructor() { }

}


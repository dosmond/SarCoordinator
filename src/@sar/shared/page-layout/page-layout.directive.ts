import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[sarPageLayout],sar-page-layout',
  host: {
    class: 'sar-page-layout'
  }
})
export class PageLayoutDirective {

  @Input() mode: 'card' | 'simple' = 'simple';

  constructor() { }

  @HostBinding('class.sar-page-layout-card')
  get isCard() {
    return this.mode === 'card';
  }

  @HostBinding('class.sar-page-layout-simple')
  get isSimple() {
    return this.mode === 'simple';
  }

}

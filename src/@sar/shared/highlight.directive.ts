import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import * as hljs from './node_modules/highlight.js/lib/highlight.js.js';
import * as typescript from './node_modules/highlight.js/lib/languages/typescript';
import * as xml from './node_modules/highlight.js/lib/languages/xml';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('typescript', typescript);

@Directive({
  selector: 'code[sarHighlight]'
})
export class HighlightDirective implements AfterViewInit {

  constructor(private elem: ElementRef) {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.elem.nativeElement);
  }

}

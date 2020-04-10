import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'sar-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'sar-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class sarCard {
}

// noinspection TsLint
@Component({
  selector: 'sar-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'sar-card-header' },
  template: `
    <div class="sar-card-header-heading-group">
      <ng-content select="sar-card-header-heading"></ng-content>
      <ng-content select="sar-card-header-subheading"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="sar-card-header-actions"></ng-content>
  `
})
export class sarCardHeader {
}

// noinspection TsLint
@Component({
  selector: 'sar-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'sar-card-content' },
  template: `
    <ng-content></ng-content>`
})
export class sarCardContent {
}

// noinspection TsLint
@Directive({
  selector: 'sar-card-header-heading',
  host: { 'class': 'sar-card-header-heading' }
})
export class sarCardHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'sar-card-header-subheading',
  host: { 'class': 'sar-card-header-subheading' }
})
export class sarCardHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'sar-card-header-actions',
  host: { 'class': 'sar-card-header-actions' }
})
export class sarCardHeaderActions {
}


// noinspection TsLint
@Directive({
  selector: 'sar-card-actions',
  host: {
    'class': 'sar-card-actions',
    '[class.sar-card-actions-align-end]': 'align === "end"',
  }
})
export class sarCardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}

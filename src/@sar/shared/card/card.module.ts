import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  sarCard,
  sarCardActions,
  sarCardContent,
  sarCardHeader,
  sarCardHeaderActions,
  sarCardHeaderSubTitle,
  sarCardHeaderTitle
} from './card.component';

const cardComponents = [
  sarCard,
  sarCardHeader,
  sarCardHeaderTitle,
  sarCardHeaderSubTitle,
  sarCardHeaderActions,
  sarCardContent,
  sarCardActions
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...cardComponents
  ],
  exports: [
    ...cardComponents
  ]
})
export class sarCardModule {
}

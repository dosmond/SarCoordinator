import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@sar/shared/material-components.module';
import { ScrollbarModule } from '../../../../@sar/shared/scrollbar/scrollbar.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    MaterialModule,

    // Core
    ScrollbarModule,
  ],
  declarations: [ChatComponent]
})
export class ChatModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ShiftUpdateComponent } from './shift-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [ShiftUpdateComponent],
  entryComponents: [ShiftUpdateComponent],
  exports: [ShiftUpdateComponent]
})
export class ShiftUpdateModule {
}

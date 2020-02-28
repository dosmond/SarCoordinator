import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { VehicleListComponent } from './vehicle-list.component';
import { MatListModule } from '@angular/material/list';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    FuryCardModule,
    
  ],
  declarations: [VehicleListComponent],
  entryComponents: [VehicleListComponent],
  exports: [VehicleListComponent]
})
export class VehicleListModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { AddVolunteersComponent } from './add-volunteers.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
    ],
    declarations: [AddVolunteersComponent],
    exports: [AddVolunteersComponent]
})

export class AddVolunteersModule {
}
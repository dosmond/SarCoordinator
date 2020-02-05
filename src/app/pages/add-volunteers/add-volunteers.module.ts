import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { AddVolunteersComponent } from './add-volunteers.component';
import { AddVolunteersService } from './add-volunteers.service'
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
    ],
    declarations: [AddVolunteersComponent],
    exports: [AddVolunteersComponent],
    entryComponents: [AddVolunteersComponent],
    providers: [AddVolunteersService]
})

export class AddVolunteersModule {
}
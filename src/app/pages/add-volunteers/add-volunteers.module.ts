import { SarSharedModule } from './../../../@sar/sar-shared.module';
import { AddVolunteersWidgetModule } from './../dashboard/widgets/add-volunteers-widget/add-volunteers-widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../@sar/shared/material-components.module';
import { AddVolunteersComponent } from './add-volunteers.component';
import { AddVolunteersService } from './add-volunteers.service'
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AddVolunteersWidgetModule,
        SarSharedModule
    ],
    declarations: [AddVolunteersComponent],
    exports: [AddVolunteersComponent],
    entryComponents: [AddVolunteersComponent],
    providers: [AddVolunteersService]
})

export class AddVolunteersModule {
}
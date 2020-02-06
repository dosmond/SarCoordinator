import { AddVolunteersWidgetOptions } from './../dashboard/widgets/add-volunteers-widget/add-volunteers-widget-options.interface';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from './../../models/IUser';
import { Component, OnInit, Inject } from '@angular/core';
import { fadeInUpStaggerAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
import { AuthProcessService } from '../authentication/auth-service';
import { AddVolunteersService } from './add-volunteers.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material'
import { Observable, of} from 'rxjs';


@Component({
  selector: 'add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation, scaleInAnimation]
})
export class AddVolunteersComponent implements OnInit {
  selectedVolunteers = [];
  caseId: string;

  private _gap = 16;
  gap = `${this._gap}px`;

  volunteerOptions: AddVolunteersWidgetOptions = {
    title: 'Assign Volunteers',
    subTitle: 'Select volunteers to assign'
  };
  volunteerTableOptions = {
    clickable: false,
    pageSize: 5,
    columns: [
      { name: "select", property: 'select', visible: true, isModelProperty: true},
      { name: 'Name', property: 'name', visible: true, isModelProperty: true },
      { name: 'Role', property: 'roles', visible: true, isModelProperty: true },
      { name: 'Badge Number', property: 'badgeNumber', visible: true, isModelProperty: true },
    ]
  };
  volunteerDataObservable$ : Observable<any>;

  constructor(private addVolunteersService: AddVolunteersService,
              public dialogRef: MatDialogRef<AddVolunteersComponent>,
              private auth: AuthProcessService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data)
    this.auth.getIdToken().then(token => {
      this.addVolunteersService.getVolunteers(token).subscribe(res => {
        let data$ = {volunteers: res}
        this.volunteerDataObservable$ = of(data$.volunteers);
      })
    })
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

 
  //TODO: Get list of volunteers through parameter
  //      Add id's of selected volunteers to selectedVolunteers
  //      Get current caseId through parameter
  //      Pretty up page
  addVolunteers(selected){
    this.auth.getIdToken().then(token => {
      this.addVolunteersService.putVolunteers(token, this.data.caseId, selected).subscribe(res =>{
        this.dialogRef.close({created: true});
      });
    });
  }

  cancel(): void{
    this.dialogRef.close({created: false});
  }

  onNoClick(): void {
    this.dialogRef.close({created: false});
  }
}

import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
import { AuthProcessService } from '../authentication/auth-service';
import { AddVolunteersService } from './add-volunteers.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of} from 'rxjs';


@Component({
  selector: 'add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation, scaleInAnimation]
})
export class AddVolunteersComponent implements OnInit {

  selectedVolunteers = [];
  volunteers = ["Guy1", "Guy2"];
  caseId: string;
  volunteerDataObservable$ : Observable<any>;

  constructor(private addVolunteersService: AddVolunteersService,
              public dialogRef: MatDialogRef<AddVolunteersComponent>,
              private auth: AuthProcessService) {}

  ngOnInit() {
  }

  //TODO: Get list of volunteers through parameter
  //      Add id's of selected volunteers to selectedVolunteers
  //      Get current caseId through parameter
  //      Pretty up page
  addVolunteers(){
    this.auth.getIdToken().then(token => {
      this.addVolunteersService.putVolunteers(token, this.caseId, this.selectedVolunteers);
    });

    this.dialogRef.close({created: true});
  }

  cancel(): void{
    this.dialogRef.close({created: false});
  }

  onNoClick(): void {
    this.dialogRef.close({created: false});
  }
}

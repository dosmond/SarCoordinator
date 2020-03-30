import { ChangeDetectorRef, Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUpStaggerAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../../@fury/animations/scale-in.animation';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { AuthProcessService } from '../../authentication/auth-service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'fury-create-case-form',
  templateUrl: './create-case-form.component.html',
  styleUrls: ['./create-case-form.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation, scaleInAnimation]
})
export class CreateCaseFormDialogComponent implements OnInit {

  caseFormGroup: FormGroup;

  phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private auth: AuthProcessService,
              public dialogRef: MatDialogRef<CreateCaseFormDialogComponent>,
              private dashboardService: DashboardService,
              private afa: AngularFireAuth) {}

  ngOnInit() {
    this.caseFormGroup = this.fb.group({
      caseNumber: [null, Validators.required],
      caseName: [null, Validators.required],
      locationAndDescription: '',
      subjectName: [null, Validators.required],
      rpName: '',
      rpPhone: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close({created: false});
  }

  submit() {
    this.auth.getIdToken().then(token => {
      let controls = this.caseFormGroup.controls;
      let date = new Date();
      let now = (date.getMonth()+1) + ' ' + date.getDate() + ' ' + date.getFullYear();
      let countyId = localStorage.getItem("currentCounty");
      let userId = this.afa.auth.currentUser.uid;
      this.dashboardService.postCase(countyId, token, userId,
        {
          caseNumber: controls['caseNumber'].value,
          caseName: controls['caseName'].value,
          date: now,
          description: controls['locationAndDescription'].value,
          missingPersonName: [controls['subjectName'].value],
          reporterName: controls['rpName'].value
        }).subscribe(res => {
          this.dialogRef.close({created: true});
          this.snackbar.open('Case created successfully!', null, {
            duration: 5000
          });
        });
    });
  }

  cancel(){
    this.dialogRef.close({created: false});
  }

}

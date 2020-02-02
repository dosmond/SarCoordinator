import { ChangeDetectorRef, Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUpStaggerAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../../@fury/animations/scale-in.animation';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { AuthProcessService } from '../../authentication/auth-service';

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
              public dialogRef: MatDialogRef<CreateCaseFormDialogComponent>) {}

  ngOnInit() {
    this.caseFormGroup = this.fb.group({
      caseNumber: [null, Validators.required],
      caseName: '',
      locationAndDescription: '',
      subjectName: '',
      rpName: '',
      rpPhone: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.snackbar.open('Case created successfully!', null, {
      duration: 5000
    });

    this.auth.getIdToken().then(token => {
      //TODO hit create case endpoint. 
      
      this.dialogRef.close();
    })
  }

  cancel(){
    this.dialogRef.close({created: false});
  }

}

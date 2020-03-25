import { ChangeDetectorRef, Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUpStaggerAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../../@fury/animations/scale-in.animation';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { AuthProcessService } from '../../authentication/auth-service';

@Component({
  selector: 'volunteer-form-dialog',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation, scaleInAnimation]
})
export class VolunteerFormDialogComponent implements OnInit {

  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

  passwordInputType = 'password';
  role = 'Volunteer';

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private auth: AuthProcessService,
              public dialogRef: MatDialogRef<VolunteerFormDialogComponent>) {}

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      badgeNum: [null],
      phoneNum: [null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open('Hooray! You successfully created your account.', null, {
      duration: 5000
    });

    this.auth.getIdToken().then(token => {
      let controls = this.accountFormGroup.controls

      this.auth.createUserWithEmailAndName(token,
                                           {firstName: controls["firstName"].value,
                                            lastName: controls["lastName"].value,
                                            email: controls["email"].value,
                                            phoneNumber: controls["phoneNum"].value,
                                            badgeNum: controls["badgeNum"].value,
                                            role: this.role.toLowerCase()}).subscribe(res => {

          this.dialogRef.close({firstName: controls["firstName"].value,
          lastName: controls["lastName"].value,
          email: controls["email"].value,
          phoneNumber: controls["phoneNum"].value,
          badgeNum: controls["badgeNum"].value,
          role: this.role.toLowerCase(),
          created: true});
        })
    })
  }

  cancel(){
    this.dialogRef.close({created: false});
  }
}

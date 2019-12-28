import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
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

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private auth: AuthProcessService,
              public dialogRef: MatDialogRef<VolunteerFormDialogComponent>) {}

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
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
    console.log(this.accountFormGroup.controls["email"].value)
    this.auth.createUserWithEmail(this.accountFormGroup.controls["email"].value)
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }
}

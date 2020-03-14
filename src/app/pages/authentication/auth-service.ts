import { EventEmitter, forwardRef, Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import '@firebase/auth';
import { User, UserInfo } from 'firebase/app';
import { isFunction } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { Accounts } from '../enums';
import { ICredentials, ISignInProcess } from './auth-interfaces';

import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export enum AuthProvider {
  ALL = 'all',
  EmailAndPassword = 'firebase',
}

export type getErrorMessageType = (error: any) => string;
export type messageOnAuthErrorType = string | getErrorMessageType;

@Injectable({
  providedIn: 'root'
})
export class AuthProcessService implements ISignInProcess {
  onSuccessEmitter: EventEmitter<any> = new EventEmitter<any>();
  onErrorEmitter: EventEmitter<any> = new EventEmitter<any>();

  // Useful to know aubout auth state even between reloads.
  // Replace emailConfirmationSent and emailToConfirm.
  user$: Observable<User>;
  user: User;

  url : string = environment.backend

  messageOnAuthSuccess: string;
  messageOnAuthError: messageOnAuthErrorType;

  // Legacy field that is setted to true after sign up. Value is lost in case of reload. The idea here is to know if we just sent a verification email.
  emailConfirmationSent: boolean;
  // Lefacy filed that contain the mail to confirm. Same lifecyle than emailConfirmationSent.
  emailToConfirm: string;

  constructor(
    public afa: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) private _matSnackBarConfig: MatSnackBarConfig
  ) {}

  listenToUserEvents() {
    this.user$ = this.afa.user.pipe(
      tap(user => {
        this.user = user;
      })
    );
  }

  getIdToken() {
    return this.afa.auth.currentUser.getIdToken();
  }

  getUser() {
    return this.afa.auth.currentUser;
  }

  /**
   * Reset the password of the ngx-auth-firebaseui-user via email
   *
   * @param email - the email to reset
   * @returns
   */
  public resetPasswordEmail(email: string) {
    return this.afa.auth.sendPasswordResetEmail(email)
      .then(() => console.log('Password reset email sent'))
      .catch((error) => this.notifyError(error));
  }

  /**
   * General sign in mechanism to authenticate the users with a firebase project
   * using a traditional way, via username and password or by using an authentication provider
   * like google, facebook, twitter and github
   *
   * @param provider - the provider to authenticate with (google, facebook, twitter, github)
   * @param credentials
   * @returns
   */
  public async signInWith(provider: AuthProvider, credentials?: ICredentials) {
    try {
        let signInResult: UserCredential | any;

        signInResult = await this.afa.auth.signInWithEmailAndPassword(credentials.email, credentials.password) as UserCredential;
        
        await this.handleSuccess(signInResult);
    } catch (err) {
      this.handleError(err);
    }
  }

  async sendNewVerificationEmail() {
    if (!this.user) {
      return Promise.reject(new Error('No signed in user'));
    }
    return this.user.sendEmailVerification();
  }

  async signOut() {
    try {
      await this.afa.auth.signOut();
    } catch (error) {
      this.notifyError(error);
    }
  }

  public deleteAccount(): Promise<any> {
    return this.afa.auth.currentUser.delete();
  }

  public parseUserInfo(user: User): UserInfo {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerData.length > 0 ? user.providerData[0].providerId : null
    };
  }

  public getPhotoPath(image: string) {
    return `assets/user/${image}.svg`;
  }

  public signInWithPhoneNumber() {
    // todo: 3.1.18
  }

  async handleSuccess(userCredential: UserCredential) {
    this.onSuccessEmitter.next(userCredential.user);
    const fallbackMessage = `Hello ${userCredential.user.displayName ? userCredential.user.displayName : ''}!`;
    this.showToast(this.messageOnAuthSuccess || fallbackMessage); 
    this.router.navigate(["/"]);
  }

  handleError(error: any) {
    this.notifyError(error);
    console.error(error);
  }

  // Refresh user info. Can be useful for instance to get latest status regarding email verification.
  reloadUserInfo() {
    return this.user.reload();
  }

  createUserWithEmailAndName(token, form){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };
    return this.http.post(`${this.url}/postUser`, form, httpOptions)
  }

  // Search for an error message.
  // Consumers of this library are given the possibility to provide a function in case they want to instrument message based on error properties.
  getMessageOnAuthError(error: any) {
    let message: string;
    const fallbackMessage = 'Sorry, something went wrong. Please retry later.';
    if (isFunction(this.messageOnAuthError)) {
      message = this.messageOnAuthError(error);
    } else {
      message = this.messageOnAuthError || fallbackMessage;
    }
    return message;
  }

  // Show a toast using current snackbar config. If message is empty, no toast is displayed allowing to opt-out when needed.
  // Default MatSnackBarConfig has no duration, meaning it stays visible forever.
  // If that's the case, an action button is added to allow the end-user to dismiss the toast.
  showToast(message: string) {
    if (message) {
      this._snackBar.open(message, this._matSnackBarConfig.duration ? null : 'OK');
    }
  }

  showErrorToast(error: any) {
    this.showToast(this.getMessageOnAuthError(error));
  }

  notifyError(error: any) {
    this.onErrorEmitter.emit(error);
    this.showErrorToast(error);
  }

}
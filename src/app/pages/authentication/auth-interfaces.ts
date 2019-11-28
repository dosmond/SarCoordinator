import {AuthProvider} from './auth-service';

export interface ICredentials {
  email: string,
  password: string
}

export interface ISignInProcess {

  onSuccessEmitter: any;
  onErrorEmitter: any;

  signInWith(provider: AuthProvider, credentials?: ICredentials): any;

  resetPassword(email: string): any;
}
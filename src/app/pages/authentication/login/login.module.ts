import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}

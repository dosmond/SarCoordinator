import { LoggedInGuard } from './pages/authentication/logged-in-guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IncidentReportComponent } from './pages/incident-report/incident-report.component';
import { LandingLayoutComponent } from './pages/landing-page/layout/layout.component';
import { ForbiddenComponent } from './pages/miscellaneous/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    loadChildren: './pages/landing-page/home/home.module#HomeModule',
  },
  {
    path: 'login',
    loadChildren: './pages/authentication/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: './pages/authentication/register/register.module#RegisterModule',
  },
  {
    path: 'forgot-password',
    loadChildren: './pages/authentication/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        pathMatch: 'full',
        canActivate: [LoggedInGuard]
      },
      // {
      //   path: 'apps/inbox',
      //   loadChildren: './pages/apps/inbox/inbox.module#InboxModule',
      //   canActivate: [LoggedInGuard]
      // },
      // {
      //   path: 'apps/calendar',
      //   loadChildren: './pages/apps/calendar/calendar.module#CalendarAppModule',
      //   canActivate: [LoggedInGuard]
      // },
      // {
      //   path: 'apps/chat',
      //   loadChildren: './pages/apps/chat/chat.module#ChatModule',
      //   canActivate: [LoggedInGuard]
      // },
      {
        path: 'apps/maps',
        loadChildren: './pages/maps/google-maps/google-maps.module#GoogleMapsModule',
        canActivate: [LoggedInGuard]
      },
      {
        path: 'case-dashboard',
        loadChildren: './pages/dashboard/case-dashboard/case-dashboard.module#CaseDashboardModule',
        canActivate: [LoggedInGuard]
      },
      {
        path: 'audit',
        loadChildren: './pages/audit-page/audit-page.module#AuditPageModule',
        canActivate: [LoggedInGuard]
      },
      {
        path: 'volunteers',
        loadChildren: './pages/volunteer-page/volunteer-page.module#VolunteerPageModule',
        canActivate: [LoggedInGuard]
      },
      {
        path:'reports',
        component: IncidentReportComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'shift-logs',
        loadChildren: './pages/shift-logs/shift-logs.module#ShiftLogsModule',
        canActivate: [LoggedInGuard]
      }
    ],
  },
  {
    path: '403',
    loadChildren: './pages/miscellaneous/forbidden/forbidden.module#ForbiddenModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: './pages/miscellaneous/not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// chartsmodules
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { ToastrModule } from 'ng6-toastr-notifications';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

// component imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';

// guards 
import { DashboardCanActivateGuardService } from './dashboard/dashboard.canactivateguard';

// routes
const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardCanActivateGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];
export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ChartModule,ToastrModule.forRoot(), RouterModule.forRoot(appRoutes)

  ],
  providers: [DashboardCanActivateGuardService, {
    provide: HIGHCHARTS_MODULES, useFactory: highchartsModules
  }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

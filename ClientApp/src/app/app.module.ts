import { PaginationComponent } from './shared/pagination.component';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule, AuthHttpInterceptor } from "@auth0/auth0-angular";
import { environment as env } from './../environments/environment';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoService } from './services/photo.service';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AdminComponent } from './admin/admin.component';
import { NonAuthorizedComponent } from './non-authorized/non-authorized.component';
import { Auth0Service } from './services/auth0.service';
import { Auth0Guard } from './services/auth0-guard.service';
import { AdminAuth0Guard } from './services/admin-auth0-guard.service';
import { LoadingComponent } from './loading/loading.component';
// import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    PhotosComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AdminComponent,
    NonAuthorizedComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      ...env.auth,
      // cacheLocation: 'localstorage'
      httpInterceptor: {
        allowedList: [
          `${env.dev.apiUrl}/api/makes`,
          `${env.dev.apiUrl}/api/vehicles/*`
        ]
      }
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
      { path: '', redirectTo: 'Vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'admin', component: AdminComponent, canActivate: [Auth0Guard, AdminAuth0Guard] },
      { path: 'non-authorized', component: NonAuthorizedComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    VehicleService,
    PhotoService,
    Auth0Service,
    Auth0Guard,
    AdminAuth0Guard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// enableProdMode();
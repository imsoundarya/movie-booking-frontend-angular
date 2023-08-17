import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard-service';
import { LoginComponent } from './login/login.component';
import { AdminScreenComponent } from './admin-screen/admin-screen.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminScreenComponent, canActivate: [AuthGuard] },
  { path: 'user-bookings', component: UserBookingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

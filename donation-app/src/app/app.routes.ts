import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';       // 👈 Any component inside layout
import { LayoutComponent } from './Layout/layout.component';
import { DonationTypeComponent } from './Master/donation-type/donation-type.component';
import { UserRoleComponent } from './Master/user-role/user-role.component';
import { MasterPageComponent } from './Common/master-page/master-page.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },

  // Protected layout routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: LayoutComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  {
    path: 'master',
    component: LayoutComponent,
    children: [
      { path: 'donation-type', component: MasterPageComponent },
      { path: 'user-role', component: MasterPageComponent },
      { path: 'donation-category', component: MasterPageComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,ReactiveFormsModule]
})
export class AppRoutingModule {}

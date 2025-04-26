import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';       // 👈 Any component inside layout
import { LayoutComponent } from './Layout/layout.component';

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
      // ...add more pages here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

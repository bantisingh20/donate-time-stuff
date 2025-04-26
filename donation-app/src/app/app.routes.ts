import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
 
 

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route (login)
     { path: 'login', component: LoginComponent },
     { path: 'sign-up', component: SignupComponent },
     {
      path: 'dashboard',
      component: DashboardComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule],
    exports: [RouterModule] 
  })

  export class AppRoutingModule {}
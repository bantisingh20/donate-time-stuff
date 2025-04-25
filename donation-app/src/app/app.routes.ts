import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './appNew/shared/login/login.component';
import { SignUpComponent } from './appNew/shared/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
 
 

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route (login)
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes),ReactiveFormsModule,BrowserModule],
    exports: [RouterModule] 
  })

  export class AppRoutingModule {}
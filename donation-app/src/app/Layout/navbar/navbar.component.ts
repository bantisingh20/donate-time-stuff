import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() isOpen = true;

  navbarmenuclick(){
    this.isOpen=true;
    console.log(this.isOpen);
  }

  

  logout() {
    localStorage.clear();
    console.log('User logged out');
  }
}

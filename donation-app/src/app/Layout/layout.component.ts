import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarOpen = false;
  menuItems = [
    { label: 'Home', link: '/home' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Profile', link: '/profile' },
    { label: 'Settings', link: '/settings' }
  ];

  handleSidebarOpenClose = (data?: boolean): void => {
    if (typeof data === 'boolean') {
      this.isSidebarOpen = data;
    } else {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  
    console.log('Sidebar state is now:', this.isSidebarOpen);
  };
}

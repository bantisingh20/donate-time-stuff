import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() parentFunction?: (data: any) => void;
 
  navbarmenuclick(): void {
    
    if (this.parentFunction) { 
      this.parentFunction(false);
    } else {
      console.warn('parentFunction is not defined');
    }
  }
  @Input() menuItems: { label: string; link: string }[] = [];
}

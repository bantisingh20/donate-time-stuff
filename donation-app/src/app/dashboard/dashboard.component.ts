// dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[CommonModule]
})
export class DashboardComponent {
  volunteerOpportunities = [
    { 
      title: 'Food Bank Helper', 
      date: new Date('2025-05-01'), 
      charityName: 'City Food Bank', 
      location: '123 Main St, Cityville', 
      isApplied: false
    },
    { 
      title: 'Park Clean-Up', 
      date: new Date('2025-05-10'), 
      charityName: 'Green Earth', 
      location: '456 Park Ave, Cityville', 
      isApplied: false
    }
  ];

  itemsNeeded = [
    { 
      name: 'Canned Food', 
      quantity: 100, 
      charityName: 'City Food Bank', 
      location: '123 Main St, Cityville', 
      isDonated: false
    },
    { 
      name: 'Blankets', 
      quantity: 50, 
      charityName: 'Warm Hearts Shelter', 
      location: '789 Shelter Rd, Cityville', 
      isDonated: false
    }
  ];

  // Method to apply for an event
  applyForEvent(opportunity: any) {
    opportunity.isApplied = true;
    alert(`You have successfully applied for: ${opportunity.title}`);
  }

  // Method to donate an item
  donateItem(item: any) {
    item.isDonated = true;
    alert(`You have successfully donated: ${item.name}`);
  }
}

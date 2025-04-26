import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChartComponent } from '../Common/chart/chart.component';

interface Donation {
  id: number;
  type: 'time' | 'item';
  name: string;
  amount: number;
  date: Date;
  category: string;
}


interface ChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,ChartComponent  ],
  templateUrl: './dashboard.component.html',
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    :host {
      font-family: 'Poppins', sans-serif;
    }
  `]
})
export class DashboardComponent implements OnInit {
  donations: Donation[] = [];
  
  newDonation: Partial<Donation> = {
    type: 'time',
    name: '',
    amount: 0,
    category: '',
    date: new Date()
  };

  // Chart data
  monthlyDonationsData: ChartData[] = [];
  categoryData: ChartData[] = [];
  trendData: ChartData[] = [];

  ngOnInit() {
    // Load sample data
    this.loadSampleData();
    
    // Initialize chart data
    this.updateChartsData();
  }
 
  loadSampleData() {
    this.donations = [
      {
        id: 1,
        type: 'time',
        name: 'Food Bank Volunteering',
        amount: 3,
        category: 'Community Service',
        date: new Date('2025-04-15')
      },
      {
        id: 2,
        type: 'item',
        name: 'Winter Coats',
        amount: 5,
        category: 'Clothing',
        date: new Date('2025-04-10')
      },
      {
        id: 3,
        type: 'time',
        name: 'Tutoring',
        amount: 2,
        category: 'Education',
        date: new Date('2025-04-20')
      },
      {
        id: 4,
        type: 'item',
        name: 'Canned Goods',
        amount: 12,
        category: 'Food',
        date: new Date('2025-04-05')
      },
      {
        id: 5,
        type: 'time',
        name: 'Animal Shelter Help',
        amount: 4,
        category: 'Animal Welfare',
        date: new Date('2025-03-25')
      },
      {
        id: 6,
        type: 'item',
        name: 'School Supplies',
        amount: 15,
        category: 'Education',
        date: new Date('2025-03-15')
      }
    ];
  }

  updateChartsData() {
    // Monthly donations data (last 6 months)
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    const tealColors = ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e'];
    
    this.monthlyDonationsData = months.map((month, index) => ({
      label: month,
      value: Math.floor(Math.random() * 15) + 5, // Random value for demo
      color: tealColors[index]
    }));
    
    console.log(this.monthlyDonationsData);
    // Category data
    const categories = this.getUniqueCategories();
    this.categoryData = categories.map((category, index) => ({
      label: category,
      value: this.getCategoryTotal(category),
      color: tealColors[index % tealColors.length]
    }));
    
    // Trend data (time vs items over time)
    this.trendData = months.map((month, index) => ({
      label: month,
      value: index + 3 + Math.floor(Math.random() * 5), // Simple upward trend with noise
      color: '#0d9488'
    }));
  }

  getUniqueCategories(): string[] {
    const categories = new Set<string>();
    this.donations.forEach(donation => categories.add(donation.category));
    return Array.from(categories);
  }

  getCategoryTotal(category: string): number {
    return this.donations
      .filter(d => d.category === category)
      .reduce((sum, donation) => sum + donation.amount, 0);
  }

  addDonation() {
    const donation: Donation = {
      id: this.getNextId(),
      type: this.newDonation.type as 'time' | 'item',
      name: this.newDonation.name || '',
      amount: this.newDonation.amount || 0,
      category: this.newDonation.category || '',
      date: this.newDonation.date ? new Date(this.newDonation.date) : new Date()
    };

    this.donations.unshift(donation);
    
    // Update charts after adding new donation
    this.updateChartsData();
    
    // Reset form
    this.newDonation = {
      type: 'time',
      name: '',
      amount: 0,
      category: '',
      date: new Date()
    };
  }

  deleteDonation(id: number) {
    this.donations = this.donations.filter(donation => donation.id !== id);
    // Update charts after deletion
    this.updateChartsData();
  }

  getNextId(): number {
    return this.donations.length > 0 
      ? Math.max(...this.donations.map(d => d.id)) + 1 
      : 1;
  }

  getTotalDonations(): number {
    return this.donations.length;
  }

  getTotalHours(): number {
    return this.donations
      .filter(d => d.type === 'time')
      .reduce((sum, donation) => sum + donation.amount, 0);
  }

  getTotalItems(): number {
    return this.donations
      .filter(d => d.type === 'item')
      .reduce((sum, donation) => sum + donation.amount, 0);
  }
}
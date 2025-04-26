import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-donation-type',
  templateUrl: './donation-type.component.html',
  styleUrls: ['./donation-type.component.css'],
  imports :[CommonModule]
})
export class DonationTypeComponent {
  // Dummy list of donation types
  donationTypes = [
    { id: 1, name: 'Zakat', description: 'Annual charitable donation' },
    { id: 2, name: 'Sadaqah', description: 'Voluntary charity' },
  ];

  isModalOpen = false;  // To control modal visibility
  selectedDonationType: any = null;  // Store selected donation type for editing

  // Open the modal for creating a new donation type or editing
  openModal(donationType?: any) {
    this.selectedDonationType = donationType || { name: '', description: '' };  // If donationType exists, edit, else create new
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedDonationType = null;
  }

  // Save or update donation type
  saveDonationType() {
    if (this.selectedDonationType.id) {
      // Update existing donation type
      const index = this.donationTypes.findIndex(item => item.id === this.selectedDonationType.id);
      this.donationTypes[index] = this.selectedDonationType;
    } else {
      // Create new donation type
      this.selectedDonationType.id = this.donationTypes.length + 1;
      this.donationTypes.push(this.selectedDonationType);
    }

    this.closeModal();
  }

  // Delete donation type
  deleteDonationType(id: number) {
    this.donationTypes = this.donationTypes.filter(item => item.id !== id);
  }
}

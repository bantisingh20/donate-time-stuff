import { DonationType } from '../enums/donation-type.enum';

export interface DonationPost {
  id: string;
  title: string;
  description: string;
  type: DonationType;
  date: string;
  status: 'Active' | 'Closed';
}

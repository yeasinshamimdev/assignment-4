import { IBreed, ICategory, ILabel, ILocation } from './cow.interface';

export const cowLocation: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const cowBreed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const cowLavel: ILabel[] = ['for sale', 'sold out'];

export const cowCategory: ICategory[] = ['Dairy', 'Beef', 'Dual Purpose'];

export const cowSearchableFields = ['minPrice', 'maxPrice', 'loacation'];

export const cowFilterableFields = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'loacation',
];

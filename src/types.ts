import { User } from './schemas/user.schema';

export type Entity<T> = {
  values: T[];
  count?: number;
};

export type SocialPostType = 'missing' | 'found';

export interface Pet {
  name: string;
  age: number;
  sex: string;
  photo?: string;
}

export interface Address {
  city: string;
  street: string;
  number: string;
  postalCode: string;
}

export interface CareTakerData {
  reputation?: number;
  bio: string;
  reviews: string[]; //array of ids
}

import * as mongoose from 'mongoose';

export type Entity<T> = {
  values: T[];
  count?: number;
};

export interface Address {
  city: string;
  street: string;
  number: string;
  postalCode: string;
}

export interface CareTakerData {
  reputation?: number;
  bio: string;
  reviews: mongoose.ObjectId[]; //array of ids
}

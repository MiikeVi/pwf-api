import * as mongoose from 'mongoose';

export type Entity<T> = {
  values: T[];
  count?: number;
};

export type SocialPostType = 'missing' | 'found';

export interface Address {
  city: string;
  street: string;
  number: string;
  postalCode: string;
}

export interface CareTakerData {
  reputation?: number;
  bio: string;
  reviews?: mongoose.ObjectId[]; //array of ids
  price: number;
}

export type JSONPatchOperation = {
  op: 'add' | 'remove' | 'replace';
  path: string;
  value?: any;
};

export type JSONPatch = Array<JSONPatchOperation>;

export type PatchBody = {
  jsonPatchBody: JSONPatch;
};

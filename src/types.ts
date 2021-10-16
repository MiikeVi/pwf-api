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
  reviews?: mongoose.ObjectId[]; //array of ids
  price: number;
  walkPaths: WalkPaths[];
  type: CareTakerType;
}

interface WalkPaths {
  location: string;
  schedule: Schedule;
}

type Schedule = {
  startTime: string;
  endTime: string;
};

export type JSONPatchOperation = {
  op: 'add' | 'remove' | 'replace';
  path: string;
  value?: any;
};

export type JSONPatch = Array<JSONPatchOperation>;

export type PatchBody = {
  jsonPatchBody: JSONPatch;
};

export enum OrderType {
  Care = 'cuidado',
  Walk = 'paseo',
}

export enum CareTakerType {
  petCare = 'cuidador',
  petWalker = 'paseador',
}

export enum OrderStatus {
  Pending = 'pendiente',
  Finished = 'terminada',
  Accepted = 'aceptada',
}

export enum PetAge {
  '1 mes a 3 meses',
  '4 meses a 8 meses',
  '9 meses a 1 año',
  '1 año a 3 años',
  '4 años a 8 años',
  '8 años a 12 años',
  'más de 12 años',
}

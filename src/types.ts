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
  walkPaths: WalkPaths;
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

export enum OrderStatus {
  Pending = 'pendiente',
  Finished = 'terminada',
  Accepted = 'aceptada',
}

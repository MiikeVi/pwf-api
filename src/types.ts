import { Pet } from './schemas/pet.schema';

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

export interface PetCareData {
  reputation?: number[];
  bio: string;
  walkerData: WalkerData;
  careTakerData: CareTakerData;
  type: CareTakerType;
  position: Geolocation;
}

export interface Geolocation {
  lat: number;
  lon: number;
}

export interface CareTakerData {
  home: HomeType;
  availability: string;
  days: Day[];
  dogsType: string[];
}

export interface WalkerData {
  reviews?: string[];
  walkPaths: WalkPath[];
}

export enum Day {
  monday = 'Lunes',
  tuesday = 'Martes',
  wednesday = 'Miercoles',
  thursday = 'Jueves',
  friday = 'Viernes',
  saturday = 'Sábado',
  sunday = 'Domingo',
}

export type WalkPath = {
  location: string;
  schedule: Schedule;
  price: number;
  shared: boolean;
  available: boolean;
  maxPets: number;
  pets: string[];
};

export enum HomeType {
  House = 'casa',
  apartment = 'Departamento',
}

type Schedule = {
  startTime: Date;
  endTime: Date;
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
  both = 'Ambos',
}

export enum OrderStatus {
  Pending = 'pendiente',
  Finished = 'terminada',
  Accepted = 'aceptada',
  Cancelled = 'cancelada',
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

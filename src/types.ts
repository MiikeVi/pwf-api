export type Entity<T> = {
  values: T[];
  count?: number;
};

export type SocialPostType = 'missing' | 'found';

export interface Pet {
  name: string;
  age: number;
  sex: string;
  breed: Breed;
  photo?: string;
  weight: number;
  type: PetType;
  medication: boolean;
  behaviors: Behaviors;
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

enum Breed {
  example = 'example',
  example2 = 'example2',
}

enum PetType {
  perro = 'perro',
  gato = 'gato',
  conejo = 'conejo',
  tortuga = 'tortuga',
  hamster = 'hamster',
}

enum Behaviors {
  amigable = 'amigable',
  jugueton = 'jugueton',
  agresivo = 'agresivo',
  tranquilo = 'tranquilo',
  conflictivo = 'conflictivo',
  inquieto = 'inquieto',
  energetico = 'energetico',
}

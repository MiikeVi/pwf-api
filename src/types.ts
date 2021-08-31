import { User } from './schemas/user.schema';

export type Users = {
  values: User[];
  count?: number;
};

export type SocialPostType = 'missing' | 'found';

export interface Pet {
  name: string;
  age: number;
  sex: string;
  photo?: string;
}

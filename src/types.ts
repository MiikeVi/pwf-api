import { User } from './schemas/user.schema';

export type Users = {
  values: User[];
  count?: number;
};

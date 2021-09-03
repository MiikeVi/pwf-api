import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from 'cluster';
import { Document } from 'mongoose';
import { CareTakerData, Pet } from 'src/types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  address: Address;

  @Prop()
  avatar: string;

  @Prop()
  birthdate: Date;

  @Prop()
  careTakerEnabled: boolean;

  @Prop()
  careTakerData?: CareTakerData;

  @Prop()
  email: string;

  @Prop()
  phoneNumbers: string[];

  @Prop()
  isActive: boolean;

  @Prop()
  name: string;

  @Prop()
  pet: Pet[];

  @Prop()
  password: string;

  @Prop()
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

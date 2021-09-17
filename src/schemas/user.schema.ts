import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CareTakerData, Pet, Address } from 'src/types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  address: string;

  @Prop()
  address2?: Address;

  @Prop()
  avatar?: string;

  @Prop()
  birthdate: Date;

  @Prop()
  careTakerEnabled: boolean;

  @Prop()
  careTakerData?: CareTakerData;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  phoneNumber2?: string;

  @Prop()
  isActive: boolean;

  @Prop()
  name: string;

  @Prop()
  pet?: Pet[];

  @Prop()
  password: string;

  @Prop()
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

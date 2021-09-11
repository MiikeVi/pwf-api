import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CareTakerData, Pet } from 'src/types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  address: string;

  @Prop()
  address2?: string;

  @Prop()
  avatar?: string;

  @Prop()
  birthdate: Date;

  @Prop()
  careTakerEnabled: boolean;

  @Prop()
  careTakerData?: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  phoneNumber2: string;

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

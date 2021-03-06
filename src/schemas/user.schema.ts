import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Address, PetCareData } from 'src/types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  address2?: Address;

  @Prop()
  region: string;

  @Prop()
  city: string;

  @Prop()
  avatar?: string;

  @Prop()
  birthdate: Date;

  @Prop()
  careTakerEnabled: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  petCareData?: PetCareData;

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

  @Prop({ type: mongoose.Types.ObjectId })
  pet?: mongoose.ObjectId[];

  @Prop()
  password: string;

  @Prop()
  permissions: string[];

  @Prop()
  stars: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

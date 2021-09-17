import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CareTakerData, Pet, Address } from 'src/types';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  address2?: Address;

  @Prop()
  avatar?: string;

  @Prop()
  birthdate: Date;

  @Prop()
  careTakerEnabled: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  careTakerData?: CareTakerData;

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

  @Prop({ type: mongoose.Schema.Types.Mixed })
  pet?: Pet[];

  @Prop()
  password: string;

  @Prop()
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

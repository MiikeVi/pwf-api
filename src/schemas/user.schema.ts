import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  isActive: boolean;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

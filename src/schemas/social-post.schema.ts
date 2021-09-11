import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pet, SocialPostType } from 'src/types';

export type SocialPostDocument = SocialPost & Document;

@Schema()
export class SocialPost {
  @Prop()
  author: string;

  @Prop()
  body: string;

  @Prop()
  date: Date;

  @Prop()
  isActive: boolean;

  @Prop()
  location: string;

  @Prop()
  pet?: Pet;

  @Prop()
  cashReward?: number;

  @Prop()
  title: string;

  @Prop()
  type: SocialPostType;
}

export const UserSchema = SchemaFactory.createForClass(SocialPost);

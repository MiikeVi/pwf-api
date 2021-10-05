import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PetDocument = Pet & Document;

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

@Schema()
export class Pet {
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  sex: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  breed: Breed;
  @Prop()
  photo?: string;
  @Prop()
  weight: number;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  type: PetType;
  @Prop()
  medication: boolean;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  behaviors?: Behaviors;
  @Prop({ type: mongoose.Types.ObjectId })
  owner: mongoose.ObjectId;
}

export const PetSchema = SchemaFactory.createForClass(Pet);

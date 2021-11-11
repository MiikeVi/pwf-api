import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PetAge } from 'src/types';

export type PetDocument = Pet & Document;

enum Breed {
  none = 'No aplica',
  bulldog1 = 'Bulldog Inglés',
  bulldog2 = 'Bulldog Francés',
  borderCollie = 'Border Collie',
  pug = 'Pug',
  germanShepherd = 'Pastor Alemán',
  yorkshireTerrier = 'Yorkshire terrier',
  whiteSwissShepherd = 'White Swiss Shepherd ',
  chiguagua = 'Chiguagua',
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
  energetico = 'energico',
}

@Schema()
export class Pet {
  @Prop()
  name: string;

  @Prop({ type: String })
  age: PetAge;

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

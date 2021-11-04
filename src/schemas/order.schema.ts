import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OrderStatus, OrderType } from 'src/types';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  createdAt: Date;

  @Prop()
  charge: number;

  @Prop()
  startDateService?: Date;

  @Prop()
  endDateService?: Date;

  @Prop({ type: mongoose.Types.ObjectId })
  userId: mongoose.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId })
  careTakerId: mongoose.ObjectId;

  @Prop()
  orderStatus: OrderStatus;

  @Prop({ type: mongoose.Types.ObjectId })
  pet: mongoose.ObjectId;

  @Prop()
  orderType: OrderType;

  @Prop()
  shared: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

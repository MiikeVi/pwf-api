import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OrderStatus, OrderType, WalkPath } from 'src/types';

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

  @Prop()
  dayService?: Date;

  @Prop({ type: mongoose.Types.ObjectId })
  userId: mongoose.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId })
  careTakerId: mongoose.ObjectId;

  @Prop({ type: String })
  orderStatus: OrderStatus;

  @Prop({ type: mongoose.Types.ObjectId })
  pet: mongoose.ObjectId;

  @Prop({ type: String })
  orderType: OrderType;

  @Prop()
  shared: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  walkPath: WalkPath;

  @Prop()
  description: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

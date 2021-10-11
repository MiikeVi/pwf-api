import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './controllers/orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

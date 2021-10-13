import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { isValidObjectId, ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Order } from 'src/schemas/order.schema';
import { OrderService } from 'src/services/order.service';
import { JSONPatch } from 'src/types';

@Controller('/orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(@Query() query: any) {
    const dbQuery: any = {};
    const page: number = parseInt(query.page) || 1;
    const limit: number = parseInt(query.limit) || 10;
    const count: boolean = query.count || false;

    if (query.userId && isValidObjectId(query.userId)) {
      dbQuery.userId = query.userId;
    }

    return this.orderService.findAll(dbQuery, page, limit, count);
  }

  @Get(':id')
  getOrderById(@Param() params: any) {
    if (!isValidObjectId(params.id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }

    const dbQuery: any = { _id: params.id };

    return this.orderService.find(dbQuery);
  }

  @Post()
  async postOrder(@Body() orderData: Order): Promise<Order> {
    if (!orderData.careTakerId) {
      throw new ConflictException(HttpStatus.NO_CONTENT, 'no body content');
    } else {
      const clonedOrder: Order = JSON.parse(JSON.stringify(orderData));
      return this.orderService.create(clonedOrder);
    }
  }

  @Patch(':id')
  patchOrder(
    @Body() orderDataPatch: JSONPatch,
    @Param() params: any,
  ): Promise<Order> {
    if (!isValidObjectId(params.id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }

    const dbQuery: any = { _id: params.id };
    return this.orderService.update(orderDataPatch, dbQuery);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: ObjectId): Promise<Order> {
    if (!isValidObjectId(id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }
    return this.orderService.delete(id);
  }
}

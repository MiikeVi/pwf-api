import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { applyPatch } from 'rfc6902';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { Entity, JSONPatch } from '../types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findAll(
    query: any,
    page: number,
    limit: number,
    count: boolean,
  ): Promise<Entity<Order>> {
    const orderData: Order[] = await this.orderModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!orderData)
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'No order found');

    if (!count) return { values: orderData };

    const countDocs: number = await this.orderModel
      .countDocuments(query)
      .then((count) => count)
      .catch((err) => {
        throw Error(err);
      });

    return { values: orderData, count: countDocs };
  }

  async find(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no order with that id',
      );
    }

    return order;
  }

  async delete(id: ObjectId): Promise<Order> {
    const order = await this.orderModel.findOneAndRemove({ _id: id }).exec();

    if (!order) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, "Can't delete order");
    }
    return order;
  }

  async create(petDto: Order): Promise<Order> {
    const createdOrder = new this.orderModel(petDto);
    if (!createdOrder)
      throw new ConflictException(HttpStatus.CONFLICT, 'Cannot save order');

    return createdOrder.save();
  }

  async update(patch: JSONPatch, orderId: ObjectId) {
    const orderToUpdate = await this.orderModel.findById(orderId).exec();

    if (!orderToUpdate) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no order with that id',
      );
    }

    const orderDtoUpdated = applyPatch(orderToUpdate, patch as any);

    if (orderDtoUpdated.filter((element) => !!element).length) {
      throw new Error(
        `Cannot patch: ${orderDtoUpdated
          .map((error) => `${error.name}: ${error.message}`)
          .join(',')}`,
      );
    }
    return orderToUpdate.save();
  }
}

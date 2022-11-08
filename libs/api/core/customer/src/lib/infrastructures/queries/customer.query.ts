import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

import { CustomerEntity } from '../entities';
import { Customer, CustomerQuery, Customers } from '../../applications';

@Injectable()
export class CustomerQueryImplement implements CustomerQuery {
  constructor(
    @InjectModel(CustomerEntity.name)
    private readonly customerModel: Model<CustomerEntity>,
  ) {}
  async findById(id: string): Promise<undefined | Customer> {
    return this.convertCustomerFromEntity(
      await this.customerModel.findOne({ id }),
    );
  }

  async find(offset: number, limit: number): Promise<Customers> {
    return this.convertCustomersFromEntities(
      await this.customerModel.find().skip(offset).limit(limit),
    );
  }

  private convertCustomerFromEntity(
    entity?: CustomerEntity,
  ): undefined | Customer {
    const model = entity
      ? (entity.toObject() as Omit<CustomerEntity, keyof Schema>)
      : undefined;
    return model
      ? {
          ...model,
          id: model['id'] || model['_id'],
          openedAt: model.createdAt,
          closedAt: model.deletedAt,
        }
      : undefined;
  }

  private convertCustomersFromEntities(entities: CustomerEntity[]): Customers {
    return entities.map((entity) => {
      const model = entity.toObject() as Omit<CustomerEntity, keyof Schema>;
      return {
        ...model,
        id: model['id'] || model['_id'],
        openedAt: model.createdAt,
        closedAt: model.deletedAt,
      };
    });
  }
}

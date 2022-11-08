import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

import { CustomerEntity } from '../entities';
import { Customer, CustomerRespository } from '../../domains';
import { CustomerFactory } from '../../domains/factory';

@Injectable()
export class CustomerRepositoryImplement implements CustomerRespository {
  constructor(
    private readonly customerFactory: CustomerFactory,
    @InjectModel(CustomerEntity.name)
    private readonly customerModel: Model<CustomerEntity>,
  ) {}

  async newId(): Promise<string> {
    const entity = await new this.customerModel().save();
    return entity['id'];
  }

  async save(data: Customer | Customer[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => {
      const entity = this.modelToEntity(model);
      return {
        updateOne: {
          filter: {
            _id: entity.id,
          },
          update: {
            $set: {
              ...entity.toObject(),
            },
          },
          upsert: true,
        },
      };
    });
    await this.customerModel.bulkWrite(entities);
  }

  async findById(id: string): Promise<Customer | null> {
    const entity = await this.customerModel.findById(id);
    return entity ? this.entityToModel(entity) : null;
  }

  findByIds: (ids: string[]) => Promise<Customer[]>;
  findByName: (name: string) => Promise<Customer[]>;

  private modelToEntity(model: Customer): CustomerEntity {
    const properties = model.properties();
    const schema = new this.customerModel({
      ...properties,
      _id: properties['id'] || properties['_id'],
      createdAt: properties.openedAt,
      deletedAt: properties.closedAt,
    });
    return schema;
  }

  private entityToModel(entity: CustomerEntity): Customer {
    const model = entity.toObject() as Omit<CustomerEntity, keyof Schema>;
    return this.customerFactory.reconstitute({
      ...model,
      id: model['id'] || model['_id'],
      openedAt: model.createdAt,
      closedAt: model.deletedAt,
    });
  }
}

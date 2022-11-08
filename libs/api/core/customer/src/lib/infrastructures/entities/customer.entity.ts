import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseEntity } from './base.entity';

@Schema({ timestamps: true, collation: { locale: 'en' } })
export class CustomerEntity extends BaseEntity {
  @Prop({
    required: false,
    index: true,
    type: String,
  })
  name: string;

  @Prop({
    required: false,
    index: true,
    type: String,
  })
  email: string;

  @Prop({
    required: false,
    type: String,
  })
  password: string;

  @Prop({
    required: false,
    type: Number,
  })
  balance: number;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);

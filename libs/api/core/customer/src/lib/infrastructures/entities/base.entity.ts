import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export abstract class BaseEntity extends Document {
  @Prop({
    required: false,
    index: true,
    type: Date,
  })
  createdAt: Date;

  @Prop({
    required: false,
    index: true,
    type: Date,
  })
  deletedAt: Date;

  @Prop({
    required: false,
    type: Date,
  })
  updatedAt: Date;
}

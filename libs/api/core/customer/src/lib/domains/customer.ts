import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from './error';
import { CustomerOpenedEvent } from './events';

export type CusomerEssentialProperties = Required<{
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}>;

export type CustomerOptionalProperties = Partial<{
  readonly balance: number;
  readonly openedAt: Date;
  readonly updatedAt: Date;
  readonly closedAt: Date | null;
}>;

export type CustomerProperties = CusomerEssentialProperties &
  Required<CustomerOptionalProperties>;

export interface Customer {
  properties: () => CustomerProperties;
  open: (password: string) => void;
  update: (data: Partial<CustomerProperties>) => void;
  close: (password: string) => void;
  commit: () => void;
}

export class CustomerImplement extends AggregateRoot implements Customer {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private password = '';
  private balance = 0;
  private readonly openedAt: Date = new Date();
  private updatedAt: Date = new Date();
  private closedAt: Date | null = null;

  constructor(
    properties: CusomerEssentialProperties & CustomerOptionalProperties,
  ) {
    super();
    Object.assign(this, properties);
  }

  properties(): CustomerProperties {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      balance: this.balance,
      openedAt: this.openedAt,
      updatedAt: this.updatedAt,
      closedAt: this.closedAt,
    };
  }

  open(password: string): void {
    this.setPassword(password);
    this.apply(Object.assign(new CustomerOpenedEvent(), this));
  }

  private setPassword(password: string): void {
    InternalServerErrorException;
    if (this.password === '' || password === '')
      throw new InternalServerErrorException(ErrorMessage.CAN_NOT_SET_PASSWORD);
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
    this.updatedAt = new Date();
  }
  update: (data: Partial<Omit<CustomerProperties, 'password'>>) => void;
  close: (password: string) => void;
}

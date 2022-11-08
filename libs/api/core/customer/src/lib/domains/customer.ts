import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from './error';
import {
  CustomerClosedEvent,
  CustomerOpenedEvent,
  CustomerUpdatedEvent,
} from './events';

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
  close: () => void;
  commit: () => void;
}

export class CustomerImplement extends AggregateRoot implements Customer {
  #properties: CustomerProperties = {
    id: '-1',
    name: '',
    email: '',
    password: '',
    balance: 0,
    openedAt: new Date(),
    updatedAt: new Date(),
    closedAt: null,
  };

  constructor(
    properties: CusomerEssentialProperties & CustomerOptionalProperties,
  ) {
    super();
    Object.assign(this.#properties, properties);
  }

  properties(): CustomerProperties {
    return this.#properties;
  }

  open(password: string): void {
    this.setPassword(password);
    this.apply(Object.assign(new CustomerOpenedEvent(), this));
  }

  private setPassword(password: string): void {
    InternalServerErrorException;
    if (this.#properties.password === '' || password === '')
      throw new InternalServerErrorException(ErrorMessage.CAN_NOT_SET_PASSWORD);
    const salt = bcrypt.genSaltSync();
    this.#properties = {
      ...this.#properties,
      password: bcrypt.hashSync(password, salt),
      updatedAt: new Date(),
    };
  }

  update(data: Partial<Omit<CustomerProperties, 'id' | 'password'>>) {
    const { name, email } = data;
    this.#properties = {
      ...this.#properties,
      name,
      email,
      updatedAt: new Date(),
    };
    this.apply(Object.assign(new CustomerUpdatedEvent(), this));
  }

  close(): void {
    this.#properties = {
      ...this.#properties,
      closedAt: new Date(),
      updatedAt: new Date(),
    };
    this.apply(Object.assign(new CustomerClosedEvent(), this));
  }
}

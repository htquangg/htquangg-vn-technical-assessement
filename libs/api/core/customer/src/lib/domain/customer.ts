import { AggregateRoot } from '@nestjs/cqrs';

export type CusomerEssentialProperties = Required<{
  readonly id: string;
  readonly name: string;
  readonly email: string;
}>;

export type CustomerOptionalProperties = Partial<{
  readonly password: string;
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

export class CustmerImplement extends AggregateRoot implements Customer {
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

  open: (password: string) => void;
  update: (data: Partial<Omit<CustomerProperties, 'password'>>) => void;
  close: (password: string) => void;
}

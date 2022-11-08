export class Customer {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly balance: number;
  readonly openedAt: Date;
  readonly updatedAt: Date;
  readonly closedAt: Date | null;
}

export class ItemInCustomers {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly balance: number;
  readonly openedAt: Date;
  readonly updatedAt: Date;
  readonly closedAt: Date | null;
}

export class Customers extends Array<ItemInCustomers> {}

export interface CustomerQuery {
  findById: (id: string) => Promise<Customer | undefined>;
  find: (offset: number, limit: number) => Promise<Customers>;
}

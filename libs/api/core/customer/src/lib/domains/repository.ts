import { Customer } from './customer';

export interface CustomerRespository {
  newId: () => Promise<string>;
  save: (data: Customer | Customer[]) => Promise<void>;
  findById: (id: string) => Promise<Customer | null>;
  findByIds: (ids: string[]) => Promise<Customer[]>;
  findByName: (name: string) => Promise<Customer[]>;
}

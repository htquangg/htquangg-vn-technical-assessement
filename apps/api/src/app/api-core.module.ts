import { Module } from '@nestjs/common';

import { ApiCoreCustomerModule } from '@htquangg/api/core/customer';

export const apiCoreModules = [ApiCoreCustomerModule];

@Module({
  imports: [...apiCoreModules],
})
export class ApiCoreModule {}

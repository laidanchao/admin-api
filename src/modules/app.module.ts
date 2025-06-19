import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from '@/config/database.config';
import { SystemModule } from '@/modules/sys/system.module';
import { CrmModule } from '@/modules/crm/crm.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => dataSourceOptions,
    }),
    AuthModule,
    SystemModule,
    CrmModule,
  ],
})
export class AppModule {
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from '@/config/database.config';
import { SysModule } from '@/modules/service/sys/sys.module';
import { CrmModule } from '@/modules/service/crm/crm.module';
import { AuthModule } from '@/modules/service/auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { FileModule } from '@/modules/service/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => dataSourceOptions,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true } // 启用中间件
    }),
    AuthModule,
    SysModule,
    CrmModule,
    FileModule
  ],
})
export class AppModule {
}

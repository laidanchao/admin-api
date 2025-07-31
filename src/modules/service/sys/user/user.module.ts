import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/modules/service/sys/user/user.service';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { MenuModule } from '@/modules/service/sys/menu/menu.module';
import { FileModule } from '@/modules/service/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MenuModule,
    FileModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}

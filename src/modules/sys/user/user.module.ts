import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/modules/sys/user/user.service';
import { UserController } from '@/modules/sys/user/user.controller';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { MenuModule } from '@/modules/sys/menu/menu.module';
import { FileModule } from '@/modules/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MenuModule,
    FileModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {
}

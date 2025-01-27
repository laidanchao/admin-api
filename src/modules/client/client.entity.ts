import { CompleteEntity } from '@/common/basic.entity';
import { Column, Entity } from 'typeorm';
import { ClientType } from '@/common/enums';

@Entity({ name: 'client' })
export class ClientEntity extends CompleteEntity {
  @Column({ unique: true })
  clientName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  clientType: ClientType;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  qq: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

}
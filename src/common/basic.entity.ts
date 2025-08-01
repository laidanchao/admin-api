import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';

export abstract class BasicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
  @CreateDateColumn()
  createdAt: Date;

  @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class CompleteEntity extends BasicEntity {
  @Column()
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}

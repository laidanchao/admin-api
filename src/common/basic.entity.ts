import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export abstract class BasicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class CompleteEntity extends BasicEntity {
  @Column()
  createBy: string;

  @Column()
  updateBy: string;
}

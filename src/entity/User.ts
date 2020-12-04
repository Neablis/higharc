import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
import Smoothie from './Smoothie';

import {
  IsEmail,
  MinLength
} from 'class-validator';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  Index
} from 'typeorm';

import { hashPassword } from '../utils';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;

  @OneToMany(() => Smoothie, (smoothie) => smoothie.user)
  smoothies: Smoothie[];

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
	addId() {
		this.id = v4();
  }
  
  @BeforeInsert()
	async hashPassword() {
    this.password = await hashPassword(this.password);
	}
}
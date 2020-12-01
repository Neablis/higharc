import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

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
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
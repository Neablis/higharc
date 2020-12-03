import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';

import {
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
  ManyToOne,
} from 'typeorm';
import Ingredient from './Ingredient';
import User from './User';


@ObjectType()
@Entity()
export default class Smoothie extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  @MinLength(3, {
    message: 'Name is too short',
  })
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.smoothie)
  ingredients: Ingredient[];

  @ManyToOne(() => User, (user) => user.smoothies, {
    nullable: false,
    eager: true,
  })
  user: User;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
	addId() {
		this.id = v4();
  }
}
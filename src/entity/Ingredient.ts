import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';

import { MinLength, IsInt, Min, Max} from "class-validator";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  Index,
  ManyToOne
} from 'typeorm';
import Smoothie from './Smoothie';


@ObjectType()
@Entity()
export default class Ingredient extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  @MinLength(3, {
    message: 'Name is too short',
  })
  name: string;

  @ManyToOne(() => Smoothie, (smoothie) => smoothie.ingredients, {
    nullable: false,
    eager: true,
  })
  smoothie: Smoothie;

  @Column({ nullable: false })
  @Field({ nullable: false })
  @IsInt()
  @Min(0)
  @Max(100)
  quantity: number;

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
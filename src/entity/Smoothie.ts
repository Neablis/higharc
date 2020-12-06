import { Field, ID, ObjectType } from "type-graphql"
import { v4 } from "uuid"

import {
  MinLength
} from "class-validator"
import { Exclude, Expose } from "class-transformer"


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
  Index,
} from "typeorm"
import Ingredient from "./Ingredient"
import User from "./User"


@ObjectType()
@Entity()
export default class Smoothie extends BaseEntity {
  @Field(() => ID, { description: "Unique identifier of the recipe" })
  @PrimaryColumn()
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: "Name of the recipe (must be longer than 3 characters)" })
  @MinLength(3, {
    message: "Name is too short",
  })
  @Index({ unique: true })
  @Expose()
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.smoothie)
  @Expose()
  ingredients: Ingredient[];

  @ManyToOne(() => User, (user) => user.smoothies, {
    nullable: true,
    eager: true,
    cascade: ["insert"],
    onDelete: "CASCADE"
  })
  @Exclude()
  user: User;

  @Field({ description: "Date Created" })
  @CreateDateColumn({ type: "timestamp" })
  @Expose()
  createdAt: Date;

  @Field({ description: "Date Last Updated" })
  @UpdateDateColumn({ type: "timestamp" })
  @Expose()
  updatedAt: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4()
  }
}
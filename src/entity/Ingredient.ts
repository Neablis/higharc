import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { v4 } from 'uuid';

import { MinLength, IsInt, Min, Max, IsEnum } from "class-validator";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne
} from 'typeorm';
import Smoothie from './Smoothie';

export enum IngredientUnit {
  CUP = "cup",
  PINCH = "pinch",
  GRAM = "gram",
  OUNCE = "ounce",
}

registerEnumType(IngredientUnit, {
  name: "IngredientUnits", // this one is mandatory
  description: "Possible Units for a ingredient", // this one is optional
});

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
    onDelete: 'CASCADE'
  })
  smoothie: Smoothie;

  @Column({ nullable: false })
  @Field({ nullable: false })
  @IsInt()
  @Min(0)
  @Max(100)
  quantity: number;

  @Column({
    type: "enum",
    enum: IngredientUnit,
    nullable: false
  })
  @Field(() => IngredientUnit, { nullable: false })
  @IsEnum(IngredientUnit)
  unit: IngredientUnit

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
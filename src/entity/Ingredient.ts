import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { v4 } from "uuid";

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
} from "typeorm";

import { Smoothie } from ".";
import { Expose } from "class-transformer";

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
export class Ingredient extends BaseEntity {
  @Field(() => ID, { description: "Unique identifier of the ingredient" })
  @PrimaryColumn()
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: "Name of the ingredient" })
  @MinLength(3, {
    message: "Name is too short",
  })
  @Expose()
  name: string;

  @ManyToOne(() => Smoothie, (smoothie) => smoothie.ingredients, {
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  smoothie: Smoothie;

  @Column({ nullable: false })
  @Field({ nullable: false, description: "How many of the ingredient for recipe" })
  @IsInt()
  @Min(0)
  @Max(100)
  @Expose()
  quantity: number;

  @Column({
    type: "enum",
    enum: IngredientUnit,
    nullable: false
  })
  @Field(() => IngredientUnit, { nullable: false, description: "Units for the quantity of the ingredient" })
  @IsEnum(IngredientUnit)
  @Expose()
  unit: IngredientUnit

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
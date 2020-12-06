import { Field, ID, ObjectType } from "type-graphql"
import { v4 } from "uuid"
import Smoothie from "./Smoothie"
import { Exclude } from "class-transformer"

import {
  IsEmail,
  MinLength
} from "class-validator"

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
} from "typeorm"

import { hashPassword } from "../utils"

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID, { description: "Unique identifier of the User" })
  @PrimaryColumn()
  id: string;

  @Field({ nullable: true, description: "Users first name" })
  @Column({ nullable: true })
  firstName?: string;

  @Field({ nullable: true, description: "Users last name" })
  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: "Users email address" })
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false, select: false })
  @MinLength(6, {
    message: "Password is too short",
  })
  @Exclude()
  password: string;

  @OneToMany(() => Smoothie, (smoothie) => smoothie.user)
  smoothies: Smoothie[];

  @Field({ description: "Users role (only admin exists)" })
  @Column({ default: false })
  isAdmin: boolean;

  @Field({ description: "Date Created" })
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field({ description: "Date Last Updated" })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4()
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hashPassword(this.password)
  }
}
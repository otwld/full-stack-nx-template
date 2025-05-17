import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";


export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
  _id!: string;

  @Prop({ required: true })
  @Field()
  name!: string;

  @Prop({ unique: true, required: true })
  @Field()
  email!: string;

  @Prop({ default: false })
  @Field()
  isVerified!: boolean;

  @Prop()
  password?: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
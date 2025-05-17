import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;
}
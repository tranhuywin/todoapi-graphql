import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  userName: string;

  @Field()
  @IsString()
  password: string;
}

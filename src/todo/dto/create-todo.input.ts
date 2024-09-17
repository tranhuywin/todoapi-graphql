import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  @MaxLength(30)
  description: string;

  @Field()
  @IsString()
  userId: string;
}

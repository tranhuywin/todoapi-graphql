import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class GetTodoListInput {
  @Field()
  @IsNumber()
  @Min(1)
  page: number;

  @Field()
  @IsNumber()
  @Min(1)
  limit: number;
}

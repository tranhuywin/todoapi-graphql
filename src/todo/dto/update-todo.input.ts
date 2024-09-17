import { Field, OmitType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ETodoStatus } from '../type/todo.type';
import { CreateTodoInput } from './create-todo.input';

export class UpdateTodoInput extends PartialType(
  OmitType(CreateTodoInput, ['userId']),
) {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsEnum(ETodoStatus)
  @IsOptional()
  status: ETodoStatus;
}

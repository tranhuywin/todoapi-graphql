import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/user/schema/user.schema';
import { ETodoStatus } from '../type/todo.type';

export type TodoDocument = mongoose.HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ETodoStatus,
    default: ETodoStatus.TODO,
  })
  status: ETodoStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User | string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

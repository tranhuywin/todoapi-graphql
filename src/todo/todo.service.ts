import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo, TodoDocument } from './schema/todo.schema';
import { UserService } from '../user/user.service';
import { GetTodoListInput } from './dto/get-todo-list.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createTodoInput: CreateTodoInput) {
    const userId = createTodoInput.userId;
    const findUser = await this.userService.findOne(userId);
    if (!findUser) {
      throw new Error('User not found');
    }
    const todo = {
      title: createTodoInput.title,
      description: createTodoInput.description,
      createdBy: findUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.todoModel.create(todo);
  }

  findAll({ page, limit }: GetTodoListInput): Promise<Todo[]> {
    return this.todoModel
      .find()
      .populate('createdBy')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(id: number) {
    return this.todoModel.findById(id).populate('createdBy');
  }

  async update(updateTodoInput: UpdateTodoInput) {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      updateTodoInput.id,
      updateTodoInput,
    );

    if (!updatedTodo) {
      throw new BadRequestException('Todo not found');
    }
    return this.todoModel.findById(updateTodoInput.id);
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

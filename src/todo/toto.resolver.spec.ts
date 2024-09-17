import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

import { Todo } from './schema/todo.schema';
import { TodoService } from './todo.service';
import { ETodoStatus } from './type/todo.type';
import { UserService } from '../user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

const mockTodo: Todo = {
  title: 'title',
  description: 'description',
  status: ETodoStatus.TODO,
  createdBy: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTodoModel = {
  create: jest.fn().mockImplementation((todo) => {
    return {
      status: ETodoStatus.TODO,
      ...todo,
    };
  }),
  populate: jest.fn().mockReturnThis(),
  find: jest.fn().mockResolvedValue([mockTodo]),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  save: jest.fn().mockReturnThis(),
};

describe('TotoResolver', () => {
  let todoService: TodoService;
  let todoModel: mongoose.Model<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: mockTodo.createdBy }),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoModel = module.get(getModelToken(Todo.name));
  });

  it('should return a todo', async () => {
    const result = await todoService.create({
      title: mockTodo.title,
      description: mockTodo.description,
      userId: mockTodo.createdBy.toString(),
    });
    expect(result).toEqual({
      ...mockTodo,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should return an array of todos', async () => {
    const result = await todoService.findAll({ page: 1, limit: 10 });
    expect(result).toEqual([mockTodo]);
  });
});

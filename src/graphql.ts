
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateTodoInput {
    title: string;
    description: string;
    userId: string;
}

export class UpdateTodoInput {
    id: string;
    title?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
}

export class GetTodoListInput {
    page?: Nullable<number>;
    limit?: Nullable<number>;
}

export class CreateUserInput {
    userName: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    userName?: Nullable<string>;
    password?: Nullable<string>;
}

export class Todo {
    _id: string;
    title: string;
    description: string;
    status: string;
    createdBy: User;
}

export abstract class IQuery {
    abstract getTodoList(getTodoListInput: GetTodoListInput): Nullable<Todo>[] | Promise<Nullable<Todo>[]>;

    abstract getTodo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract getUserList(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createTodo(createTodoInput: CreateTodoInput): Todo | Promise<Todo>;

    abstract updateTodo(updateTodoInput: UpdateTodoInput): Todo | Promise<Todo>;

    abstract removeTodo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    _id: string;
    userName: string;
    password: string;
}

type Nullable<T> = T | null;

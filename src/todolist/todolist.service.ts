import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodolistService {
  constructor(@InjectModel('Todo') private readonly postModel: Model<Todo>) {}

  async getTodos(): Promise<Todo[]> {
    const todos = await this.postModel.find().exec();
    return todos;
  }

  async addTodo(CreateTodoDTO: CreateTodoDTO): Promise<Todo> {
    const newTodo = await new this.postModel(CreateTodoDTO);
    return newTodo.save();
  }

  async editTodo(todoID, CreateTodoDTO: CreateTodoDTO): Promise<Todo> {
    const editedTodo = await this.postModel.findByIdAndUpdate(
      todoID,
      CreateTodoDTO,
      { new: true },
    );
    return editedTodo;
  }

  async deleteTodo(todoID): Promise<any> {
    const deletedTodo = await this.postModel.findByIdAndRemove(todoID);
    return deletedTodo;
  }
}

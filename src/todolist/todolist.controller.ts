import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('todolist')
export class TodolistController {
  constructor(private todolistService: TodolistService) {}

  @Get('todos')
  async getTodos(@Res() res) {
    const posts = await this.todolistService.getTodos();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Post('/todo')
  async addTodo(@Res() res, @Body() createTodoDTO: CreateTodoDTO) {
    const newPost = await this.todolistService.addTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been added successfully!',
      post: newPost,
    });
  }

  @Put('/edit')
  async editPost(
    @Res() res,
    @Query('todoID', new ValidateObjectId()) todoID,
    @Body() createTodoDTO: CreateTodoDTO,
  ) {
    const editedTodo = await this.todolistService.editTodo(
      todoID,
      createTodoDTO,
    );
    if (!editedTodo) throw new NotFoundException('Todo does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      post: editedTodo,
    });
  }

  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('todoID', new ValidateObjectId()) todoID,
  ) {
    const deletedTodo = await this.todolistService.deleteTodo(todoID);
    if (!deletedTodo) throw new NotFoundException('Todo does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been deleted!',
      post: deletedTodo,
    });
  }
}

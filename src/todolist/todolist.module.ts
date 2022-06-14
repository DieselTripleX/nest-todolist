import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodolistSchema } from './schemas/todolist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodolistSchema }]),
  ],
  providers: [TodolistService],
  controllers: [TodolistController],
})
export class TodolistModule {}

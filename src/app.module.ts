import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodolistModule } from './todolist/todolist.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-todolist', { useNewUrlParser: true }),
    TodolistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

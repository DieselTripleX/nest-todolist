import * as mongoose from 'mongoose';

export const TodolistSchema = new mongoose.Schema({
  title: String,
  achieved: Boolean,
});

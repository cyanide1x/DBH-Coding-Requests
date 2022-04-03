import { model, Schema } from 'mongoose';

export var AFKSchema = model('AFK', new Schema({
	GuildID: String,
	UserID: String,
	Status: String,
	Time: String
}))
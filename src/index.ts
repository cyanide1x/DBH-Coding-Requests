import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { Collection } from 'discord.js';
import mongoose from "mongoose";

const client = new SapphireClient({
	defaultPrefix: 'a!',
	regexPrefix: /^(hey +)?artiom/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	],
	hmr: {
		enabled: process.env.NODE_ENV === 'development'
	}
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		client.voiceGenerator = new Collection();
		await client.login();
		client.logger.info('logged in');
		const uri = 'mongodb+srv://admin:smalldirt981@artimod.skoll.mongodb.net/ArtiBot';
		// @ts-ignore
		mongoose.connect(uri, {
			// @ts-ignore
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		let database = await mongoose.connection;
		// @ts-ignore
		await database.once('open', async () => {
			console.log('Connected to database');
		});
		// @ts-ignore
		database.on('error', () => {
			console.log('Error connecting to database');
			mongoose.disconnect().then(r => console.log(r));
		});
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();

declare module '@sapphire/framework' {
	interface SapphireClient {
		voiceGenerator: Collection<unknown, unknown>;
	}
}
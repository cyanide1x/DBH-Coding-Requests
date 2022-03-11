import { Args, Command } from "@sapphire/framework";
import type { Message } from "discord.js";

export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const arg = await args.pick('string')
        if(!arg) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
        if(isNaN(parseInt(arg))) return message.channel.send('Numbers are only allowed')
        if(parseInt(arg) > 99) return message.channel.send('The max amount of messages that I can delete is 99')

        const messages = await message.channel.messages.fetch({ limit: parseInt(arg) + 1 })
        const { size } = messages;

        messages.forEach((message) => message.delete().catch(err => {
            console.log(err)
        }))

        return message.channel.send('Deleted ' + size  + " messages.")
    }
}
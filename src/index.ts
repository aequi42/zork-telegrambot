import { Telegraf } from 'telegraf'
import { getLatestEntries } from './calendar'
import { getRandomReaction } from './reactions'

const bot = new Telegraf(process.env.BOT_TOKEN!)
// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply(`👍 ${JSON.stringify(ctx.message,null,2)}`))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/ekbaris/i, getRandomReaction("ekbaris"))
bot.hears(/elthiadore/i, getRandomReaction("elthiadore"))
bot.hears(/maximus/i, getRandomReaction("maximus"))
bot.hears(/balos/i, getRandomReaction("balos"))
bot.hears(/vhucthul/i, getRandomReaction("vhucthul"))
bot.hears(/zork/i, getRandomReaction("zork"))
bot.command("termine", getLatestEntries)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

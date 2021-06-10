import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN!)
// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply(`👍 ${JSON.stringify(ctx.message,null,2)}`))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/ekbaris/i, ctx => ctx.replyWithSticker("CAACAgIAAxkBAAMNYMHlHc-b-ReJNrWDf9tOfd9Fh_4AAgEAAzuZXCI0ZkH_YXJe6R8E"))
bot.hears(/elthiadore/i, ctx => ctx.replyWithSticker("CAACAgIAAxkBAAMPYMHlOlFJKZ-Cq74dtBTTe1PrPdsAAgIAAzuZXCL0SAAB0cuhsm8fBA"))
bot.hears(/maximus/i, ctx => ctx.replyWithSticker("CAACAgIAAxkBAAMUYMHnOAQ1yD_BJ3ttiDgerkf1pCoAAgMAAzuZXCJYUlUjN1zsbh8E"))
bot.hears(/balos/i, ctx => ctx.replyWithSticker("CAACAgIAAxkBAAMXYMHnXfKijRqQTrny_7jFsmIheDYAAgQAAzuZXCJe5pwyFU2TER8E"))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

import type { Context } from "telegraf"
import { getRandomIntInclusive } from "./utilities"


export const Reactions = {
  zork: [
    (ctx: Context)=> ctx.reply(`${ctx.from?.first_name ?? ctx.from?.username}, du Made wagst es, meinen Namen auszusprechen! Der Tod soll dich holen!`),
    (ctx: Context) => ctx.reply("Schweigt still! Ich werde euch vernichten!"),
    (ctx: Context) => ctx.reply("Die Herren der Drachen werden Untergehen!"),
    (ctx: Context) => ctx.replyWithAnimation("https://media.giphy.com/media/lcFSmTvaSxwSk/giphy.gif"),
    (ctx: Context) => ctx.reply("😈")
  ],
  ekbaris: [
    (ctx: Context) => ctx.reply(`Ekbaris? Dieser mikriger Magier? Sein Drache soll ihn Fressen!`),
    (ctx: Context) => ctx.replyWithSticker("CAACAgIAAxkBAAMNYMHlHc-b-ReJNrWDf9tOfd9Fh_4AAgEAAzuZXCI0ZkH_YXJe6R8E"),
  ],
  elthiadore: [
    (ctx: Context) => ctx.reply(`Pha! Elthiadóre kann mir garnichts! Soll er lieber bei seinen Büchern bleiben!`),
    (ctx: Context) => ctx.replyWithSticker("CAACAgIAAxkBAAMPYMHlOlFJKZ-Cq74dtBTTe1PrPdsAAgIAAzuZXCL0SAAB0cuhsm8fBA"),
  ],
  maximus: [
    (ctx: Context) => ctx.replyWithSticker("CAACAgIAAxkBAAMUYMHnOAQ1yD_BJ3ttiDgerkf1pCoAAgMAAzuZXCJYUlUjN1zsbh8E")
  ],
  balos: [
    (ctx:Context) => ctx.replyWithSticker("CAACAgIAAxkBAAMXYMHnXfKijRqQTrny_7jFsmIheDYAAgQAAzuZXCJe5pwyFU2TER8E")
  ],
  vhucthul: [
    (ctx:Context) => ctx.reply("Argh! Dieser Verräter!")
  ]
}


export function getRandomReaction(trigger: keyof typeof Reactions) {
  const values = Reactions[trigger]
  const length = values.length
  return (ctx: Context) => {
    var idx = getRandomIntInclusive(0,length-1)
    return values[idx](ctx)
  };
}

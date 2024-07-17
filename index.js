require('dotenv').config()
const express = require("express");
const cors = require('cors')
const TelegramBot = require('node-telegram-bot-api');
const token = `7312470931:AAHaQGNrA-ON6oRIl0JKo3F_FAI0ARIyWMo`
const webAppUrl = 'https://tg-bot-urbi-test.vercel.app//'

// import express from 'express'
// import dotenv from "dotenv"

const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard} = require('grammy')
const {hydrate} = require('@grammyjs/hydrate')
// import {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard} from 'grammy'
// import {hydrate} from '@grammyjs/hydrate'
const bot = new Bot(process.env.BOT_API_KEY)
const app = express();
app.use(express.json())
app.use(cors())

// const botapp = new TelegramBot(token, {polling: true});
bot.use(hydrate())

// bot.on(':media').on('::url',()=>{}) метод И

/*ghadshhashkadskhhjdsa*/ 
// bot.on('message',async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
  
//       if(text === '/start'){
//           await bot.sendMessage(chatId, 'Ниже появилась кнопка для заполнения формы', {
//               reply_markup:{
//                   keyboard:[
//                       [{text:'Сделать заказ', web_app:{url:webAppUrl}}]
//                   ]
//               }
//           });
//           await bot.sendMessage(chatId, 'Ниже появилась кнопка для заполнения формы', {
//               reply_markup:{
//                   inline_keyboard:[
//                       [{text:'Сделать заказ', web_app:{url:webAppUrl}}]
//                   ]
//               }
//           });
//       }
//   });
/*ghadshhashkadskhhjdsa*/ 
console.log(bot);
bot.hears(/блин/, async ctx=>{
    await ctx.reply('ругаешься (')
})

bot.api.setMyCommands([
    {
        command:'start', description:'Запуск бота',
    },
    {
        command:'mood', description:'Запуск бота',
    },
])

bot.command('start', async (ctx)=>{
    const lineKeyboard = new InlineKeyboard()
    lineKeyboard.inline_keyboard.push([{text:'Сделать заказ', web_app:{url:webAppUrl}}])
    // lineKeyboard.keyboard.push([{text:'Открыть наш магазин', web_app:{url:webAppUrl}}])

    await ctx.reply(`Привет! Я бот. \n тебе помогу`)
    await ctx.reply('Командуй', {
        reply_markup:lineKeyboard
    })
})

bot.command('mood', async ctx=>{
    const moodKeyboard = new Keyboard().text('Good',).text('So so').row()/*.oneTime() убрать клаву  .resized() уменьение кропки*/
    moodKeyboard.keyboard.push([{text:'Сделать заказ', web_app:{url:webAppUrl + '/form'}}])
    // console.log(moodKeyboard.keyboard[1]);
    await ctx.reply('Как настроение?', {
        reply_markup:moodKeyboard,
    })
})

bot.on('message', async (ctx)=>{
    
    if(ctx.update?.message?.web_app_data?.data != undefined){
        const data = JSON.parse(ctx?.update?.message?.web_app_data?.data)
        await ctx.reply(`Тааак, ваши данные: \n страна: ${data.country} \n Улица: ${data.street} \n страна: ${data.subject}`)
    }else{
        await ctx.reply('Надо подумать...')
    }
})

bot.catch((err)=>{
    const ctx = err.ctx
    console.error(`${ctx.update.update_id}:`);
    const e = err.error

    if(e instanceof GrammyError){
        console.error('Error in request:', e.description);
    }else if(e instanceof HttpError){
        console.error('Error in request:', e.description);
    }else{
        console.error('Unknown error:', e);
    }
})


  

bot.start()

app.get('/', (req,res)=>{
    res.send(`/запущен бот \n Ураааааа  \n Ураааааа ${bot}`)
})

app.post('/web-data', (req,res)=>{
    const {queryId, products, totalPrice} = req.body
    bot.on('message', async (ctx)=>{
        await ctx.reply(`Папарапарапа`)
    })
})

const PORT = 8000
app.listen(PORT,()=>console.log(`server start on port ${PORT}`))
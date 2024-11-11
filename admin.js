const {Menu} = require  ("@grammyjs/menu");
const { sendMessageToAllUsers } = require("./services");
const { getPassword } = require("./db");

const ADMINPASSWORD = "adminArtem"

const adminMenu = new Menu("adminMenu")
  .text("Сделать рассылку", async (ctx) => { 
    await ctx.conversation.enter("notifyUsers")
  })
  .row()
  .text("Выйти", async (ctx) => {
    adminIsAuthenticated = false;
    await ctx.answerCallbackQuery("Вы вышли из кабинета владельца.");
    await ctx.deleteMessage();
  });

  module.exports = {adminMenu, ADMINPASSWORD}
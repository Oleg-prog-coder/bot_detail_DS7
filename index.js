require("dotenv").config();
const { Menu, MenuRange } = require("@grammyjs/menu");
const { Bot, InlineKeyboard, session, Keyboard } = require("grammy");
const { hydrate } = require("@grammyjs/hydrate");
const { mainmenu } = require("./menus");
const { createUser, createOrder } = require("./db");
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");

const { adminMenu, ADMINPASSWORD } = require("./admin");
const { notifyUsers} = require("./services");

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());
bot.use(
  session({
    initial: () => ({
      savedOrders: [],
      serviceDb: [],
    }),
  })
);
bot.use(conversations());
bot.use(createConversation(notifyUsers));
bot.use(mainmenu);
bot.use(adminMenu);
bot.command("start", async (ctx) => {
  await ctx.deleteMessage();
  await createUser({ tg_id: ctx.from.id });
  await ctx.replyWithPhoto(
    "AgACAgIAAxkBAAIGHGclGW8VWfAYsZlf2v4Di9U7UOoYAAK56jEbFZooSV2UeC1itUDLAQADAgADcwADNgQ",
    {
      caption:
        "Мы рады представить вашему вниманию, наш новый большой проект - DS7!Это не автомойка, в привычном понимании. Это сервис совершенно нового формата, для Вас и вашего автомобиля.",
      reply_markup: mainmenu,
    }
  );
});

bot.on('message:text', async (ctx) => {
  if (ctx.msg.text === ADMINPASSWORD) {
    await ctx.deleteMessage();
    await ctx.reply("Пароль верный! Добро пожаловать в кабинет владельца!", {
      reply_markup: adminMenu,
    });
  }
});

bot.api.setMyCommands([{ command: "start", description: "Старт" }]);

//id куда уходят заказы
const targetChatId = "-1002304333944";

bot.callbackQuery("back", async (ctx) => {
  await ctx.reply({ reply_markup: mainmenu });
  ctx.msg.delete;
  ctx.menu.nav("mainmenu");
});

bot.callbackQuery("delete", async (ctx) => {
  await ctx.deleteMessage();
});
bot.callbackQuery("apply", async (ctx) => {
  try {
    const orderText = ctx.callbackQuery.message.text;
    const sessionOrdersData = ctx.session;
    const clientId = ctx.from.id;

    const contentArray = Array.isArray(ctx.session.servicesDb)
      ? ctx.session.servicesDb
      : [];
    console.log(contentArray);

    const content = contentArray.length > 0 ? contentArray.join(", ") : ""; // Преобразуем массив в строку или используем пустую строку
    await createOrder({ authorId: clientId, content }); // преобразование массива в строку

    // Экранируем специальные символы в тексте
    let adminOrderText = `Новый заказ (от: [Профиль клиента](tg://user?id=${clientId}))\n${orderText}\n`;

    const infoText =
      "Ожидайте ответа администратора для подтверждения заказа.\n" +
      "После оформления заказа его можно посмотреть в разделе (История заказов)";
    adminOrderText = adminOrderText.replace(infoText, "").trim();

    // Убедитесь, что savedOrders существует и является массивом
    if (!Array.isArray(sessionOrdersData.savedOrders)) {
      sessionOrdersData.savedOrders = []; // Инициализируем как пустой массив, если не существует
    }

    sessionOrdersData.savedOrders.push(orderText);
    ctx.session.servicesDb = [];
    // Очищаем массив услуг
    
    // Проверка наличия username для добавления в сообщение
    if (ctx.from.username) {
      adminOrderText += `Профиль пользователя: @${ctx.from.username}`;
    } else {
      const userId = ctx.from.id; // Получаем ID пользователя
      const userLink = `tg://user?id=${userId}`; // Формируем ссылку
      adminOrderText += `Ссылка на пользователя: [Профиль пользователя](${userLink})`;
    }
    
    // Отправка сообщения в целевой чат
    await bot.api.sendMessage(targetChatId, adminOrderText, {
      parse_mode: "Markdown",
    });
    
    ctx.session.savedOrders = [];
    await ctx.answerCallbackQuery("Заказ сохранён");
    await ctx.deleteMessage();
  } catch (error) {
    console.error("Ошибка в обработчике колбэков:", error);
    await ctx.answerCallbackQuery("Произошла ошибка. Попробуйте снова."); // Уведомление об ошибке
  }
});

bot.callbackQuery("close", async (ctx) => {
  await ctx.deleteMessage();
});


bot.on(":photo", async (ctx) => {
  await ctx.reply(ctx.msg.photo[0]?.file_id, {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});
bot.on(":document", async (ctx) => {
  await ctx.reply(ctx.msg.document?.file_id, {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

bot.start();

const { Menu, MenuRange } = require("@grammyjs/menu");
const { delay } = require("./services");
const { InlineKeyboard, Bot } = require("grammy");
const { hydrate } = require("@grammyjs/hydrate");
const {
  everage,
  preview,
  buisiness,
  cross,
  suv,
  car1,
  car3,
  car,
  car2,
  everage1,
  everage2,
  everage3,
  buisiness1,
  buisiness2,
  buisiness3,
  cross1,
  cross2,
  cross3,
  suv1,
  suv2,
  suv3,
  minivan,
  minivan1,
  minivan2,
  minivan3,
  minivanExample,
  suvExample,
  crossExample,
  buisinessExample,
  everageExample,
  carExample,
} = require("./photo");
const {
  backInlineKeyBoard,
  manageOrderKeyBoard,
  closeOrderList,
} = require("./keyboards");
const { generateMenu } = require("./menus/generateMenu");
const { minivanServMenu } = require("./menus/minivanServMenu");
const { carServMenu } = require("./menus/carServMenu");
const { crossServMenu } = require("./menus/crossServMenu");
const { suvServMenu } = require("./menus/suvServMenu");
const { averageServMenu } = require("./menus/averageSernMenu");
const { businessServMenu } = require("./menus/businessServMenu");
const { getUserOrders } = require("./db");
const bot = new Bot(process.env.BOT_API_KEY);
const backToMenu = new InlineKeyboard().text("Вернуться назад", "Back");
bot.use(hydrate());
const mainmenu = new Menu("mainmenu")
  .text("Список услуг", async (ctx) => {
    ctx.menu.nav("service_list");
  })
  .row()
  .url("Связаться с администратором", "https://t.me/ds7detailing")
  .row()
  .text("О нас", async (ctx) => {
    ctx.menu.nav("aboutUsMenu");
    await ctx.msg.editCaption(
      "В нашем детейлинг центре Вы можете воспользоваться комплексными услугами или составить набор опций под себя. С полным списком услуг и прайс листом, Вы можете ознакомиться по телефону: +7 910 872 40 04, посетив DS7, по адресу: г.Нижний Новгород, ул. Коминтерна 47а/1 или в нашем Телеграмм боте."
    );
  })
  .row()
  .url("Отызвы", (ctx) => "https://t.me/+RpDowZC6EzA1ODAy ")
  .url("Мы на карте", "https://yandex.ru/maps/-/CDTbeZYe")
  .row()
  .text("Сделать заказ", async (ctx) => {
    ctx.menu.nav("makeOrderMenu");
    await ctx.msg.editCaption("Выберете тип кузова вашего авто🚗");
  })
  .row()
  .text("История заказов", async (ctx) => {
    ctx.menu.nav("ordersHistoryMenu");
    await ctx.msg.editCaption(
      "Здесь вы можете ознакомится с историей заказов📑"
    );
  });

const ordersHistoryMenu = new Menu("ordersHistoryMenu")
  .text("Просмотр прошлых заказов", async (ctx) => {
    const tgId = ctx.from.id.toString();
    const orders = await getUserOrders(tgId);

    if (!orders || orders.length === 0) {
      await ctx.answerCallbackQuery("Нет сохраненных заказов.");
      return;
    } else {
      const ordersList = orders
        .map((order, index) => {
          return `${index + 1}. ${
            order.content
          }\n(Создан: ${order.createAt.toLocaleString()})\n\n`;
        })
        .join("");

      await ctx.answerCallbackQuery("Вот Ваши сохраненные заказы:");
      await ctx.reply(ordersList, { reply_markup: closeOrderList });
    }
  })
  .row()
  .back("Назад", async (ctx) => {
    ctx.menu.nav("mainmenu");
    await ctx.msg.editCaption(
      "Мы рады представить вашему вниманию, наш новый большой проект - DS7!Это не автомойка, в привычном понимании. Это сервис совершенно нового формата, для Вас и вашего автомобиля."
    );
  });

const servises = new Menu("service_list")
  .text("Компактное авто", async (ctx) => {
    await ctx.replyWithMediaGroup([car, car1, carExample]);
  })
  .row()
  .text("Средний размер авто", async (ctx) => {
    await ctx.replyWithMediaGroup([
      everage,
      everage1,
      everageExample
    ]);
  })
  .row()
  .text("Бизнес", async (ctx) => {
    await ctx.replyWithMediaGroup([
      buisiness,
      buisiness1,
      buisinessExample
    ]);
  })
  .row()
  .text("Кроссовер", async (ctx) => {
    await ctx.replyWithMediaGroup([
      cross,
      cross1,
      crossExample
    ]);
  })
  .row()
  .text("Внедорожник ", async (ctx) => {
    await ctx.replyWithMediaGroup([suv, suv1, suvExample]);
  })
  .row()
  .text("Микроавтобс", async (ctx) => {
    await ctx.replyWithMediaGroup([
      minivan,
      minivan1,
      minivanExample
    ]);
  })
  .row()
  .text("Получить PDF файл с ценами", async (ctx) => {
    await ctx.replyWithDocument(
      "BQACAgIAAxkBAAIGIGcnQEw--huiNQ1F4m9jL26e8bbeAAI8VQACPRNBSbaTUp4FTQ4XNgQ"
    );
  })
  .row()
  .text("Назад", async (ctx) => {
    ctx.menu.nav("mainmenu");
    ctx.msg.editCaption(
      "Мы рады представить вашему вниманию, наш новый большой проект - DS7!Это не автомойка, в привычном понимании. Это сервис совершенно нового формата, для Вас и вашего автомобиля."
    );
  });

const aboutUsMenu = new Menu("aboutUsMenu")
  .url("Наш Тг канал", "https://t.me/DS7detailingnn")
  .row()
  .back("Назад", async (ctx) => {
    ctx.menu.nav("mainmenu");
    await ctx.msg.editCaption(
      "Мы рады представить вашему вниманию, наш новый большой проект - DS7!Это не автомойка, в привычном понимании. Это сервис совершенно нового формата, для Вас и вашего автомобиля."
    );
  });

const makeOrderMenu = new Menu("makeOrderMenu")
  .text("Компактное авто", async (ctx) => {
    await ctx.msg.editCaption("Выберете услуги для вашего  авто🚗");
    ctx.menu.nav("carServMenu");
  })
  .row()
  .text("Авто среднего размера", async (ctx) => {
    await ctx.msg.editCaption("Выберете услуги для вашего  авто🚗");
    ctx.menu.nav("averageServMenu");
  })
  .row()
  .text("Бизнес", async (ctx) => {
    await ctx.msg.editCaption("Выберете услуги для вашего  авто🚗");
    ctx.menu.nav("businessServMenu");
  })
  .row()
  .text("Кроссвер", async (ctx) => {
    await ctx.msg.editCaption("Выберете услуги для вашего  авто🚗");
    ctx.menu.nav("crossServMenu");
  })
  .row()
  .text("Внедорожник", async (ctx) => {
    await ctx.msg.editCaption("Выберете услуги для вашего  авто🚗");
    ctx.menu.nav("suvServMenu");
  })
  .row()
  .text("Микроавтобус", async (ctx) => {
    await ctx.msg.editCaption("Выберете услуги для вашего  авто🚗");
    ctx.menu.nav("minivanServMenu");
  })
  .row()
  .back("Назад", async (ctx) => {
    ctx.menu.nav("mainmenu");
    await ctx.msg.editCaption(
      "Мы рады представить вашему вниманию, наш новый большой проект - DS7!Это не автомойка, в привычном понимании. Это сервис совершенно нового формата, для Вас и вашего автомобиля."
    );
  });

mainmenu.register([
  servises,
  aboutUsMenu,
  ordersHistoryMenu,
  makeOrderMenu,
  carServMenu,
  averageServMenu,
  businessServMenu,
  crossServMenu,
  suvServMenu,
  minivanServMenu,
]);

module.exports = { mainmenu };

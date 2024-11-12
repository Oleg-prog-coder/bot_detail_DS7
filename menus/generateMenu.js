const { Menu, MenuRange } = require("@grammyjs/menu");
const { mapPriseList, buttons } = require("../priceList");
const { manageOrderKeyBoard } = require("../keyboards");
const makeList = (carType) => {
  return structuredClone(mapPriseList(carType));
};

const generateMenu = (menuName, copyList) => {
  const menu = new Menu(menuName).dynamic(() => {
    const range = new MenuRange();
    copyList.forEach((button) => {
      range
        .text(`${button.text} ${button.isActive ? "✅" : ""}`, async (ctx) => {
          button.isActive = !button.isActive;
          ctx.menu.update();
          await ctx.answerCallbackQuery("Услуга выбрана.");
        })
        .row();
    });
    const hasActiveServices = copyList.some((button) => button.isActive);

    if (hasActiveServices) {
      range
        .text("Подтвердить", async (ctx) => {
          const services = copyList.filter((button) => button.isActive);
          const servicesText = services.map(
            (service) => `\n${service.text} - ${service.price} ₽`
          );
          const servicesDb = services.map((service) => `${service.text}`);
          ctx.session.servicesDb = servicesDb;

          const totalPrice = services.reduce((sum, service) => {
            return (
              sum + (typeof service.price === "number" ? service.price : 0)
            );
          }, 0);

          let additionalText = "";
          const hasContractPriceServices = services.some(
            (service) => service.price === "договорная"
          );
          if (hasContractPriceServices) {
            additionalText =
              "Ваш заказ содержит услуги, по которым назначена договорная цена, уточнить которую можно у администратора в гланом меню.";
          }
          const orderDate =
            ctx.session.orderDate || new Date().toLocaleDateString();

          const addInfo =
            "Ожидайте ответа администратора для подтверждения заказа.\n" +
            "После оформления заказа его можно посмотреть в разделе (История заказов)";

          const text = `Дата заказа: ${orderDate}\nКоличество услуг: ${
            services.length
          }\nОбщая сумма: ${totalPrice} ₽\n${servicesText.join(
            ""
          )}\n${additionalText}\n${addInfo}`;

          await ctx.reply(text, {
            reply_markup: manageOrderKeyBoard,
          });
          copyList.forEach((button) => {
            button.isActive = false;
          });
          ctx.menu.update();
          try {
            await ctx.msg.delete();
          } catch (error) {}
        })
        .row();
    }

    range
      .text("Назад", async (ctx) => {
        ctx.menu.nav("makeOrderMenu");
      })
      .row();

    return range;
  });
  return menu;
};

module.exports = { generateMenu, makeList };

const { InlineKeyboard, Keyboard } = require("grammy");

const backInlineKeyBoard = new InlineKeyboard().text("Вернуться назад", "back");

const manageOrderKeyBoard = new InlineKeyboard()
  .text("Удалить заказ", "delete")
  .text("Оформить заказ", "apply");

const closeOrderList = new InlineKeyboard().text("Закрыть", "close");

const cancelNotify = new InlineKeyboard().text("Прекратить рассылку", "cancel")
module.exports = {
  backInlineKeyBoard,
  manageOrderKeyBoard,
  closeOrderList,
  cancelNotify
};

const { conversations } = require("@grammyjs/conversations");
const { resolver } = require("@grammyjs/conversations/out/utils");
const { getAllUsers } = require("./db");
const { Bot } = require("grammy");

delay = function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


const notifyUsers = async (conversation, ctx) => {
  const question = await ctx.reply("Введите текст рассылки:");

  const messageCtx = await conversation.wait(); // ждем ответ
  await ctx.api.deleteMessage(question.chat.id, question.message_id);
  await sendMessageToAllUsers(messageCtx, ctx);
};

const sendMessageToAllUsers = async (messageCtx, ctx) => {
  try {
    const allTgIds = await getAllUsers();
    if (!allTgIds || allTgIds.length === 0) {
      await ctx.reply("Не удалось получить список пользователей.");
      return;
    }

    await ctx.reply("Рассылка в процессе...");

    const processList = async () => {
      let successCount = 0;
      let failedCount = 0;

      for (const tgId of allTgIds) {

        try {
          await ctx.msg.copy(tgId.tg_id); // Отправка сообщения пользователю
          successCount++;
        } catch (error) {
          console.error(`Ошибка при отправке сообщения пользователю ${tgId}:`, error);
          failedCount++;
        }

        await delay(1000); // Задержка между отправками
      }

      return { successCount, failedCount };
    };

    const { successCount, failedCount } = await processList();

    await ctx.reply(
      `Рассылка успешно завершена!
Успешно отправлено: ${successCount}
Не удалось отправить: ${failedCount}`
    );
  } catch (error) {
    console.error("Ошибка при рассылке сообщений:", error);
  }
};
module.exports = { notifyUsers, isNotifying };

const Prisma = require("@prisma/client");
const prisma = new Prisma.PrismaClient();

module.exports.createUser = async ({ tg_id }) => {

  tg_id = tg_id.toString();
  try {
    const user = await prisma.user.create({
      data: {
        tg_id,
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUsers = async () => {
  try {
    const allIds = prisma.user.findMany({
      select: {
        tg_id: true,
      },
    });
    return allIds;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.createPassword = async (label, value) => {
  try {
    // Проверяем, существует ли пароль с данным лейблом
    const existingPassword = await prisma.password.findUnique({
      where: { label },
    });

    if (existingPassword) {
      return false; // Пароль с таким лейблом уже существует
    }

    // Сохраняем новый пароль в базе данных
    await prisma.password.create({
      data: { label, value },
    });
    return true; // Пароль успешно сохранен
  } catch (error) {
    console.error("Ошибка при создании пароля:", error);
    return false; // Ошибка при создании пароля
  }
};


module.exports.getPassword = async (value) => {
  try {
    const password = prisma.password.findUnique({
      where: {
        value,
      },
    });
    return password;
  } catch (error) {
    console.log(error);
    return false;
  }
};


module.exports.createOrder = async ({ authorId, content }) => {
  authorId = authorId.toString();

  try {
    let user = await prisma.user.findUnique({
      where: { tg_id: authorId }, 
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          tg_id: authorId,
        },
      });
      console.log('Пользователь создан:', user);
    }

    const order = await prisma.order.create({
      data: {
        author: {
          connect: {
            tg_id: user.tg_id, // связывыем заказ с сущесвующим пользователем
          },
        },
        content: content,
      },
    });
    console.log('Order created:', order);
    return order; 
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

module.exports.getUserOrders = async (tgId) => {
  try {
    const userWithOrders = await prisma.user.findUnique({
      where: { tg_id: tgId },
      select: {
        orders: {
          select: {
            content: true,
            createAt: true,
          },
        },
      },
    });

    return userWithOrders ? userWithOrders.orders : [];
  } catch (error) {
    console.log(error);
    return false;
  }
};


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.password.create({
    data: {
      label: 'adminPassword',
      value: 'adminArtem', 
    },
  });

  console.log("Пароль успешно добавлен в базу данных!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
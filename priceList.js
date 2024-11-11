const buttons = [
  {
    text: "Тех/мойка",
    price: {
      car: 350,
      average: 350,
      business: 350,
      cross: 400,
      suv: 450,
      minivan: 600,
    },
  },
  {
    text: "2-х фазная мойка",
    price: {
      car: 450,
      average: 550,
      business: 650,
      cross: 650,
      suv: 750,
      minivan: 850,
    },
  },
  {
    text: "Комплекс 2-х фазная мойка, пылесос, влажная уборка, стекла",
    price: {
      car: 1000,
      average: 1100,
      business: 1200,
      cross: 1300,
      suv: 1600,
      minivan: 2000,
    },
  },
  {
    text: "Мойка двигателя",
    price: {
      car: 600,
      average: 650,
      business: 700,
      cross: 750,
      suv: 800,
      minivan: 800,
    },
  },
  {
    text: "Детальная мойка двигателя диэлектрик + консервант",
    price: {
      car: 2000,
      average: 2200,
      business: 2300,
      cross: 2400,
      suv: 2500,
      minivan: 2500,
    },
  },
  {
    text: "Влажная уборка салона Quick detailler",
    price: {
      car: 300,
      average: 350,
      business: 400,
      cross: 450,
      suv: 500,
      minivan: 600,
    },
  },
  {
    text: "Озонирование салона устраняет неприятные запахи и дезинфицирует систему кондиционирования",
    price: {
      car: 1000,
      average: 1200,
      business: 1300,
      cross: 1400,
      suv: 1500,
      minivan: 1700,
    },
  },
  {
    text: "Пылесос салона",
    price: {
      car: 200,
      average: 250,
      business: 300,
      cross: 300,
      suv: 400,
      minivan: 500,
    },
  },
  {
    text: "Пылесос багажник + влажная уборка",
    price: {
      car: 100,
      average: 150,
      business: 200,
      cross: 200,
      suv: 250,
      minivan: 300,
    },
  },
  {
    text: "Чистка дисков металл вкрапления + антибитум",
    price: {
      car: 800,
      average: 900,
      business: 1000,
      cross: 1100,
      suv: 1200,
      minivan: 1200,
    },
  },
  {
    text: "Чистка дисков металл вкрапления",
    price: {
      car: 600,
      average: 650,
      business: 700,
      cross: 750,
      suv: 800,
      minivan: 800,
    },
  },
  {
    text: "Кондиционер кожи",
    price: {
      car: 600,
      average: 600,
      business: 650,
      cross: 650,
      suv: 700,
      minivan: 800,
    },
  },
  {
    text: "Чистка кожи + крем Letech",
    price: {
      car: 2000,
      average: 2500,
      business: 2650,
      cross: 2750,
      suv: 2850,
      minivan: 3500,
    },
  },
  {
    text: "Антибитум 1 элемент  ",
    price: {
      car: 200,
      average: 200,
      business: 200,
      cross: 200,
      suv: 200,
      minivan: 200,
    },
  },
  {
    text: "Удаление сложных загряз нений с кузова  1 элемент ",
    price: {
      car: 200,
      average: 250,
      business: 250,
      cross: 250,
      suv: 300,
      minivan: 300,
    },
  },
  {
    text: "Чернение шин",
    price: {
      car: 200,
      average: 200,
      business: 250,
      cross: 250,
      suv: 300,
      minivan: 300,
    },
  },
  {
    text: "Силиконовая смазка  резинок",
    price: {
      car: 200,
      average: 250,
      business: 250,
      cross: 250,
      suv: 300,
      minivan: 350,
    },
  },
  {
    text: "Чистка стекол",
    price: {
      car: 250,
      average: 300,
      business: 350,
      cross: 350,
      suv: 400,
      minivan: 500,
    },
  },
  {
    text: "Кварцевое покрытие кузова 3 фаза",
    price: {
      car: 500,
      average: 600,
      business: 650,
      cross: 700,
      suv: 750,
      minivan: 800,
    },
  },
  {
    text: "Химчистка кузова 2-х фазная мойка,удаление металлических вкраплений,битумных пятен",
    price: {
      car: 2000,
      average: 2300,
      business: 2500,
      cross: 2650,
      suv: 3000,
      minivan: 3500,
    },
  },
  {
    text: "Мойка обледеневших арок + к основной мойке",
    price: {
      car: 200,
      average: 200,
      business: 200,
      cross: 250,
      suv: 300,
      minivan: 300,
    },
  },
  {
    text: "Детальня химчистка дисков демонтаж/монтаж ",
    price: {
      car: 2200,
      average: 2200,
      business: 2200,
      cross: 2200,
      suv: 2200,
      minivan: 2200,
    },
  },
  {
    text: "Химчситка салона стандарт, демонтаж/монтаж передних кресел",
    price: {
      car: 6000,
      average: 7000,
      business: 8000,
      cross: 9000,
      suv: 10000,
      minivan: 13000,
    },
  },
  {
    text: "Химчистка салона детальная с разбором ",
    price: {
      car: 12000,
      average: 15000,
      business: 18000,
      cross: 20000,
      suv: 25000,
      minivan: 35000,
    },
  },
  {
    text: "Полировка оптики головного света Фар 2шт",
    price: {
      car: 1500,
      average: 1500,
      business: 1500,
      cross: 1500,
      suv: 1500,
      minivan: 1500,
    },
  },
  {
    text: "Полировка кузова легкая  ",
    price: {
      car: 7000,
      average: 8000,
      business: 9000,
      cross: 10000,
      suv: 12000,
      minivan: 15000,
    },
  },
  {
    text: "Полировка кузова восстановительная + 2 слоя керамики Gliss Pro Strong   ",
    price: {
      car: 35000,
      average: 40000,
      business: 45000,
      cross: 50000,
      suv: 55000,
      minivan: 70000,
    },
  },
  {
    text: "Реставрация кожаных элементов салона по технологии Letech",
    price: {
      car: 3500,
      average: 3500,
      business: 3500,
      cross: 3500,
      suv: 3500,
      minivan: 3500,
    },
  },
  {
    text: "Чистка выхлопных труб хром насадка за 1шт",
    price: {
      car: 500,
      average: 500,
      business: 500,
      cross: 500,
      suv: 500,
      minivan: 500,
    },
  },
  {
    text: "Обработка кузова воском ручное нанесение без полировки кузова",
    price: {
      car: 3500,
      average: 4000,
      business: 5000,
      cross: 6000,
      suv: 7000,
      minivan: 8000,
    },
  },
  {
    text: " Антидождь передняя полусфера",
    price: {
      car: 1000,
      average: 1200,
      business: 1300,
      cross: 1400,
      suv: 1500,
      minivan: 1600,
    },
  },
  {
    text: "Химчистка подвески+колесные арки ",
    price: {
      car: 400,
      average: 400,
      business: 400,
      cross: 400,
      suv: 400,
      minivan: 400,
    },
  },
  {
    text: "Химчистка пола/ковралина от соли и загрязнений 1 пассажирместо    ",
    price: {
      car: 500,
      average: 500,
      business: 500,
      cross: 500,
      suv: 500,
      minivan: 500,
    },
  },
  {
    text: "Оклейка фар полиуретановой бронепленкой  ",
    price: {
      car: 6000,
      average: 6000,
      business: 6000,
      cross: 6000,
      suv: 6000,
      minivan: 6000,
    },
  },
  {
    text: "Оклейка элементов кузова полиуретановой броне пленкой",
    price: "договорная",
  },
  { text: "Шумоизоляция кузова", price: "договорная" },
  {
    text: "Шумоизоляция колесных арок и локеров",
    price: "договорная",
  },
  {
    text: "Удаление тополиных почек 1 элемент от 10 почек на элементе ",
    price: "договорная",
  },
  {
    text: "Удаление следов насекомых передняя часть авто",
    price: {
      car: 300,
      average: 300,
      business: 350,
      cross: 350,
      suv: 400,
      minivan: 450,
    },
  },
];

const mapPriseList = (carType) => {
  const newList = buttons.map((item) => {
    return {
      text: item.text,
      price: item.price[carType] ? item.price[carType] : "договорная",
      isActive: false,
    };
  });
  return newList;
};


module.exports = { mapPriseList, buttons};

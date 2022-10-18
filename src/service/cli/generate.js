'use strict';

const {getRandomInt, shuffle} = require(`../../utils`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const PictureRestrict = {
  min: 1,
  max: 16,
};

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const generateOffers = (count) => {
  const category = [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]];
  const description = shuffle(SENTENCES).slice(1, 5).join(` `);
  const picture = getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max));
  const title = TITLES[getRandomInt(0, TITLES.length - 1)];
  const type = Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)];
  const sum = getRandomInt(SumRestrict.min, SumRestrict.max);

  return Array(count).fill({}).map(() => ({
    category,
    description,
    picture,
    title,
    type,
    sum,
  }))
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) return console.error(`Can't write data to file...`);
      return  console.log(`Operation success. File created.`)
    })
  }
}

const { makeList, generateMenu } = require("./generateMenu");

const list = makeList("car");

const carServMenu = generateMenu("carServMenu", list);

module.exports = { carServMenu };

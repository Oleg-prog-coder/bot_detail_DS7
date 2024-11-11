const { makeList, generateMenu } = require("./generateMenu");

const list = makeList("suv");

const suvServMenu = generateMenu("suvServMenu", list);

module.exports = { suvServMenu };

const { makeList, generateMenu } = require("./generateMenu")

const list = makeList("cross");

const crossServMenu = generateMenu("crossServMenu", list);

module.exports = { crossServMenu};
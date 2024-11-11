const { generateMenu, makeList } = require("./generateMenu");

list = makeList("minivan");

const minivanServMenu = generateMenu("minivanServMenu", list);

module.exports = { minivanServMenu };

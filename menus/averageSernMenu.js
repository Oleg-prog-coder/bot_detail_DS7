const { makeList, generateMenu } = require("./generateMenu");

const list = makeList("average");

const averageServMenu = generateMenu("averageServMenu", list)

module.exports = { averageServMenu };
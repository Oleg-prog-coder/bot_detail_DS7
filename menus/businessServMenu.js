const {makeList, generateMenu} = require ("./generateMenu");

const list = makeList("business");

const businessServMenu = generateMenu("businessServMenu", list);

module.exports = {businessServMenu};
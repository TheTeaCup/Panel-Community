const Config = require('./modules/Config/config');
const Hardware = require('./modules/Hardware/hardware');

global.config = new Config();
global.hardware = new Hardware();

async function tests() {
    console.log(global.config.get("web"));
    console.log(await global.hardware.getStats(false));
}

tests();

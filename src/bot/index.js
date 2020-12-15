const Discord = require('discord.js');

global.bot = new Discord.Client();

try {
    bot.login()
} catch (e) {
    // log err
}

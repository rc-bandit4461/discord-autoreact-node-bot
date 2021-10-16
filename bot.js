const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
//reacts to the user message with the emojis present in config.user.emojis  
function global_react(message,user){
    // console.log("GLOBAL REACT");
    for(const emoji_id of user.emojis){
        const emoji = message.guild.emojis.cache.get(emoji_id);
        if(emoji != undefined)
        message.react(emoji);
    }
}
//reacts to the user message with the emojis present in config.user.reactions
// if a pattern has been found, the reactions associated with it will take place  
function pattern_react(message,user){
    // console.log("PATTERN REACT");
    for(reaction of user.reactions){
        for(pattern of reaction.patterns) if (message.content.toLowerCase().replace(/( |  )/g,"").includes(pattern)) {
            for(const emoji_id of reaction.emojis){
                const emoji = message.guild.emojis.cache.get(emoji_id);
                if(emoji != undefined)
                message.react(emoji);
            }
            return;
        }
    }
}
bot.on("ready", function () {
    console.log("Ready!");
    let users = config.users;
    if(config.global.global_pattern == true || config.global.special_patterns == true) 
        users.push(config.global); // adding global configuration as a user
});

bot.on("message", (message) => {
    for (const user of config.users) { 
        if (user.id == "global" || user.id == message.author.id){ //user has special treats!
            if (user.to_all_channels || user.channels.includes(message.channel.id)) { 
// if to_all_channels is enabled, checking which channel it is will be omitted
                if (user.global_pattern === true) global_react(message, user); // if global pattern is enabled, the message will get the global "normal reaction"
                if(user.special_patterns === true) pattern_react(message,user); // if its a "special user" or a "special case", the bot will add more reactions that are specified
            }
            return;
        }
    }
});

bot.login(config.token); // make sure to place your bot token in config

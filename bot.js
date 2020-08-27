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
        for(pattern of reaction.patterns) if (message.content.toLowerCase().includes(pattern)) {
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
});

bot.on("message", (message) => {
    for (const user of config.users) {
        if (user.id != message.author.id) continue;
        if (user.to_all_channels || user.channels.includes(message.channel.id)) {
            if (user.global_pattern == true) global_react(message, user);
            if(user.special_patterns == true) pattern_react(message,user);
        }        
        return;
    }
});

bot.login(config.token);
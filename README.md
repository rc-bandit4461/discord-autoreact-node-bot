# discord-autoreact-node-bot
 Autoreact discord bot. It has a config file where you can specify the emoji IDs you want in each pattern found. A global config is available as well as a per user basis.
 No flashy database used, only a STATIC config file. It is for small "private" servers for you and your friends. 
 Here is an explanation of the config file.
```javascript
{
    "token": "Place your bot token here",
    "global":{
        "id":"global",
        "emojis": ["699544201452584971"], //specify default emojis that the bot will react with
        "channels": ["690648368451682347"],    // specifies target channels
        "to_all_channels":true, // if enabled, target "channels" (the option above) will be ignored
        "global_pattern":false, //if enabled, "this" global config will be enabled
        "special_patterns":true,  // if enabled, the special "reactions" (below) based on a pattern will be enabled
        "reactions":[
            {
                "patterns":["mypattern","mypattern2"],
                "emojis":[
                    "EMOJI ID 5",
                    "701585034204938321"
                ]
            }
        ]
    },
	"users": [ // this is per individual users
		{
			"id": "522193697182449674", // the user ID
			"emojis": ["699544201452584971"], // custom emojis for every message of this user
            "channels": ["690648368451682347"], // the target channels for the reactions
            "to_all_channels":true, //if enabled, the bot will react in all channels
            "global_pattern":false, // if disabled, the bot will not react to this user with the "global config" above
            "special_patterns":true, // if enabled, the bot will check for special patterns (described in "reactions" object below) 
            "reactions":[
                {
                    "patterns":["bar","fooo"],
                    "emojis":[
                        "EMOJI ID 1",
                        "EMOJI ID 2",
                        "701585034204938321"
                    ]
                }
            ]
        }
    ]
}

```

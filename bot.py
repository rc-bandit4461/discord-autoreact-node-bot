import discord
from discord.ext import commands
from discord.ext.commands import Bot
import asyncio

bot = commands.Bot(command_prefix='!crab')

allowed_channels = [
    "657332654911258646",
    "690648368451682347"
]


@bot.event
async def on_ready():
    print("welcome_msg")


async def react(message):
    custom_emojis = [
        "<:rah_anji_nkwik:707359443767001178>",
        "<:news:657343002288848937>"
    ]
    guild_emoji_names = [str(guild_emoji)
                         for guild_emoji in message.guild.emojis]
    for emoji in custom_emojis:
        print(emoji, guild_emoji_names)
        print(emoji in guild_emoji_names)
        if emoji in guild_emoji_names:
            await message.add_reaction(emoji)


@bot.event
async def on_message(message):
    # if message.channel.id == "channelid" and message.author.id == "authorid":
    if message.channel.id in allowed_channels:
        print(message.content)
        await react(message)

bot.run("NzQ4MzU2NjEzMjMyMDAxMDQ1.X0cPaA.IVDyaE9pHp6pLvI6F3Bzp30E-NM")

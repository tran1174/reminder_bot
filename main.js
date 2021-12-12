const { Client, Intents, DiscordAPIError, Collection } = require ('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const prefix = 'r!';

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Reminder Bot is ready');
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    const args = message.content.slice(prefix.length).split("/ +/");
    const command = args.shift().toLowerCase();

    if(command === 'bing')
        client.commands.get('bing').execute(message,args);
});
client.login(token);
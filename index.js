const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})

const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();

//command handler
const path = ${process.cwd()}/src/commands;
const categories = fs.readdirSync(${path}/).filter((category) => !category.includes("."));
if (categories.length <= 0) return console.log(❎ | Could not find any category at ${path});
for (const category of categories) { console.log("Commands Handling", ${category} Category);
const commands = fs.readdirSync(${path}/${category}/).filter((files) => files.split(".").pop() === "js");
if (commands.length <= 0) return console.log(❎ | Couldnt find any commands at ${path}/${category});
 for (const file of commands) {
  const command = require(${path}/${category}/${file});
  delete require.cache[require.resolve(${path}/${category}/${file})];
  if(!(command.help.name)) return console.error(❌ | ${file} > missing a help.name);
  console.log("Commands Handling", ✅ | ${command.help.name.toProperCase()} Command);
 }
}
//event handler

const path = ${process.cwd()}/src/events;
const events = fs.readdirSync(${path}/).filter((files) => files.split(".").pop() === "js");
if (events.length <= 0) return console.log(❎ | Could not find any events listener at ${path});
for (const file of events) { console.log(✅ | ${file.split(".")[0]} Event);
const event = require(${path}/${file});
client.on(file.split(".")[0], event.bind(null, client));
delete require.cache[require.resolve(${path}/${file})];

}

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)

})
                       
client.on('message', async message =>{
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;
if(!message.guild) return;
if(!message.member) message.member = await message.guild.fetchMember(message);
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const cmd = args.shift().toLowerCase();
if(cmd.length == 0 ) return;
let command = client.commands.get(cmd)
if(!command) command = client.commands.get(client.aliases.get(cmd));
if(command) command.run(client, message, args) 
})
client.login(token)

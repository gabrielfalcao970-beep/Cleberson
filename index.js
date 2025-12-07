// index.js - Bot Gamer completo (Node.js, discord.js v14)
const fs = require('fs');
const path = require('path');
const express = require('express');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// cria pastas/arquivos JSON se não existirem
const DATA_FILES = ['./economia.json','./xp.json','./loja.json','./reactions.json'];
for(const f of DATA_FILES){
  if(!fs.existsSync(f)) fs.writeFileSync(f, '{}');
}

client.commands = new Collection();
// carrega comandos da pasta commands
const commandsPath = path.join(__dirname, 'commands');
if(fs.existsSync(commandsPath)){
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    try{
      const cmd = require(filePath);
      if(cmd && cmd.name){
        client.commands.set(cmd.name, cmd);
        console.log(`Comando carregado: ${cmd.name}`);
      }
    }catch(err){
      console.error(`Erro ao carregar ${file}:`, err);
    }
  }
}

// Express - servidor web para manter online (Render/UptimeRobot)
const app = express();
app.get('/', (req, res) => res.send('Bot Gamer rodando!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webserver escutando na porta ${PORT}`));

// eventos básicos
client.once('ready', () => {
  console.log(`Bot online! ${client.user.tag}`);
});

// Handler de mensagens (prefixo "!" - adaptável)
const PREFIX = '!';
client.on('messageCreate', async message => {
  try{
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) {
      // xp automático por mensagem (sistema leve)
      const xpData = JSON.parse(fs.readFileSync('./xp.json','utf-8'));
      const uid = message.author.id;
      if(!xpData[uid]) xpData[uid] = { xp: 0, level: 1 };
      xpData[uid].xp += 5;
      if(xpData[uid].xp >= xpData[uid].level * 100){
        xpData[uid].level++;
        xpData[uid].xp = 0;
        message.reply(`🎉 ${message.author.username} subiu para o nível ${xpData[uid].level}!`);
      }
      fs.writeFileSync('./xp.json', JSON.stringify(xpData, null, 2));
      return;
    }

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if(!command) return;
    await command.execute({ client, message, args, fs, PREFIX });
  }catch(err){
    console.error('Erro no messageCreate:', err);
    message.reply('❌ Ocorreu um erro ao executar o comando.');
  }
});

// Reactions - adicionar/remover cargos por reação (idade/interesses etc)
client.on('messageReactionAdd', async (reaction, user) => {
  if(user.bot) return;
  try{
    if(reaction.partial) await reaction.fetch();
    const reactions = JSON.parse(fs.readFileSync('./reactions.json','utf-8'));
    const msgId = reaction.message.id;
    if(reactions[msgId]){
      const mapping = reactions[msgId]; // { "🔞": "roleId", "👶": "roleId2" }
      const roleId = mapping[reaction.emoji.name] || mapping[reaction.emoji.id]; // emoji can be custom or unicode
      if(roleId){
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        if(member && !member.roles.cache.has(roleId)) await member.roles.add(roleId).catch(()=>{});
      }
    }
  }catch(e){ console.error('reactionAdd error', e); }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if(user.bot) return;
  try{
    if(reaction.partial) await reaction.fetch();
    const reactions = JSON.parse(fs.readFileSync('./reactions.json','utf-8'));
    const msgId = reaction.message.id;
    if(reactions[msgId]){
      const mapping = reactions[msgId];
      const roleId = mapping[reaction.emoji.name] || mapping[reaction.emoji.id];
      if(roleId){
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        if(member && member.roles.cache.has(roleId)) await member.roles.remove(roleId).catch(()=>{});
      }
    }
  }catch(e){ console.error('reactionRemove error', e); }
});

// login (use variável de ambiente TOKEN)
if(!process.env.TOKEN){
  console.error('ERRO: defina a variável de ambiente TOKEN no Render/GitHub Secrets.');
  process.exit(1);
}
client.login(process.env.MTA3OTIwMzAzODQzMjA3OTk0Mg.Gt_3EZ.thoSILQAj1ZPc6Pb4YhHIHe_f2bTzuvLLqQIAg);

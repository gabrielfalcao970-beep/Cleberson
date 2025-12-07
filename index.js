// =========================
// BOT GAMER - INDEX.JS
// =========================

const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
require("dotenv").config();

// =======================================
// INICIAR CLIENTE DO DISCORD
// =======================================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

client.commands = new Collection();
const prefix = "!";

// =======================================
// CARREGAR COMANDOS AUTOMATICAMENTE
// =======================================
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
    console.log(`Comando carregado: ${command.name}`);
}

// =======================================
// SISTEMA DE XP E NÍVEIS
// =======================================
let xpData = {};

if (fs.existsSync("./xp.json")) {
    xpData = JSON.parse(fs.readFileSync("./xp.json", "utf8"));
} else {
    fs.writeFileSync("./xp.json", JSON.stringify({}));
}

function addXP(userId) {
    if (!xpData[userId]) {
        xpData[userId] = { xp: 0, level: 1 };
    }

    xpData[userId].xp += Math.floor(Math.random() * 10) + 5;

    const nextLevel = xpData[userId].level * 200;

    if (xpData[userId].xp >= nextLevel) {
        xpData[userId].level++;
        return true;
    } else {
        return false;
    }
}

function saveXP() {
    fs.writeFileSync("./xp.json", JSON.stringify(xpData, null, 2));
}

// =======================================
// EVENTO: BOAS-VINDAS
// =======================================
client.on("guildMemberAdd", (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        channel.send(`🎮 **Bem-vindo ao servidor gamer, ${member.user}**!`);
    }
});

// =======================================
// EVENTO: MENSAGENS
// =======================================
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // XP
    const upou = addXP(message.author.id);
    saveXP();

    if (upou) {
        message.reply(`🔥 **${message.author}, você subiu para o nível ${xpData[message.author.id].level}!**`);
    }

    // Prefixo
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        command.run(client, message, args);
    } catch (err) {
        console.log("Erro ao executar comando:", err);
        message.reply("❌ Ocorreu um erro ao executar esse comando.");
    }
});

// =======================================
// LOGIN
// =======================================
client.login(process.env.TOKEN)
    .then(() => console.log("BOT iniciado com sucesso!"))
    .catch(err => console.error("Erro ao logar:", err));

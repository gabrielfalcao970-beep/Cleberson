module.exports = {
  name: 'level',
  description: 'Mostra seu nível e XP',
  async execute({ message, fs }){
    const xpData = JSON.parse(fs.readFileSync('./xp.json','utf-8'));
    const uid = message.author.id;
    if(!xpData[uid]) xpData[uid] = { xp: 0, level: 1 };
    message.reply(`📊 ${message.author.username}, nível ${xpData[uid].level} — XP: ${xpData[uid].xp}`);
  }
};

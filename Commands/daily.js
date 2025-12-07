module.exports = {
  name: 'daily',
  description: 'Recebe coins diários',
  async execute({ message, fs }){
    const econ = JSON.parse(fs.readFileSync('./economia.json','utf-8'));
    const user = message.author;
    if(!econ[user.id]) econ[user.id] = { dinheiro: 0, lastDaily: 0 };
    const now = Date.now();
    const last = econ[user.id].lastDaily || 0;
    const day = 24 * 60 * 60 * 1000;
    if(now - last < day) return message.reply('Você já pegou o daily hoje. Volte amanhã.');
    econ[user.id].dinheiro += 100;
    econ[user.id].lastDaily = now;
    fs.writeFileSync('./economia.json', JSON.stringify(econ, null, 2));
    message.reply('🎁 Você recebeu 100 coins diários!');
  }
};

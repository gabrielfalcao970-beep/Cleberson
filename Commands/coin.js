module.exports = {
  name: 'saldo',
  description: 'Mostra seu saldo de coins',
  async execute({ message, fs }){
    const econ = JSON.parse(fs.readFileSync('./economia.json','utf-8'));
    const user = message.author;
    if(!econ[user.id]) econ[user.id] = { dinheiro: 0 };
    message.reply(`💰 ${user.username}, você tem ${econ[user.id].dinheiro} coins.`);
  }
};

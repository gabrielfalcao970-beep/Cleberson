module.exports = {
  name: 'pay',
  description: 'Paga coins para outro usuário: !pay @user 50',
  async execute({ message, args, fs }){
    const target = message.mentions.users.first();
    const amount = args[1] ? parseInt(args[1]) : NaN;
    if(!target || isNaN(amount) || amount <= 0) return message.reply('Use: !pay @user [quantia]');
    const econ = JSON.parse(fs.readFileSync('./economia.json','utf-8'));
    const from = message.author;
    if(!econ[from.id]) econ[from.id] = { dinheiro: 0 };
    if(!econ[target.id]) econ[target.id] = { dinheiro: 0 };
    if(econ[from.id].dinheiro < amount) return message.reply('Saldo insuficiente.');
    econ[from.id].dinheiro -= amount;
    econ[target.id].dinheiro += amount;
    fs.writeFileSync('./economia.json', JSON.stringify(econ, null, 2));
    message.reply(`💸 ${from.username} enviou ${amount} coins para ${target.username}.`);
  }
};

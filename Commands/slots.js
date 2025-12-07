module.exports = {
  name: 'slots',
  description: 'Slots com aposta: !slots 50',
  async execute({ message, args, fs }){
    const bet = args[0] ? parseInt(args[0]) : 0;
    const user = message.author;
    const econ = JSON.parse(fs.readFileSync('./economia.json','utf-8'));
    if(!econ[user.id]) econ[user.id] = { dinheiro: 0 };
    if(bet <= 0) return message.reply('Use: !slots [quantia]');
    if(econ[user.id].dinheiro < bet) return message.reply('Saldo insuficiente.');

    const emojis = ['🍒','🍋','🍉','🍇','🍊'];
    const r = () => emojis[Math.floor(Math.random()*emojis.length)];
    const a = r(), b = r(), c = r();
    let texto = `${a} | ${b} | ${c}\n`;

    if(a === b && b === c){
      const ganho = bet * 5;
      econ[user.id].dinheiro += ganho;
      texto += `🎉 JACKPOT! Você ganhou ${ganho} coins!`;
    } else if (a === b || b === c || a === c){
      const ganho = Math.floor(bet * 1.5);
      econ[user.id].dinheiro += ganho;
      texto += `🙂 Quase! Você ganhou ${ganho} coins.`;
    } else {
      econ[user.id].dinheiro -= bet;
      texto += `😢 Você perdeu ${bet} coins.`;
    }
    fs.writeFileSync('./economia.json', JSON.stringify(econ, null, 2));
    message.reply(texto);
  }
};

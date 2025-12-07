module.exports = {
  name: 'coinflip',
  description: 'Cara ou coroa. Use com valor para apostar: !coinflip cara 50',
  async execute({ message, args, fs }){
    const user = message.author;
    const choice = args[0] ? args[0].toLowerCase() : null; // 'cara' ou 'coroa'
    const bet = args[1] ? parseInt(args[1]) : 0;

    const econ = JSON.parse(fs.readFileSync('./economia.json','utf-8'));
    if(!econ[user.id]) econ[user.id] = { dinheiro: 0 };

    if(bet > 0){
      if(econ[user.id].dinheiro < bet) return message.reply('Você não tem coins suficientes.');
    }

    const result = Math.random() < 0.5 ? 'cara' : 'coroa';
    if(choice){
      if(choice !== 'cara' && choice !== 'coroa') return message.reply('Escolha "cara" ou "coroa".');
      if(choice === result){
        const ganho = bet > 0 ? bet*2 : 0;
        if(ganho > 0) econ[user.id].dinheiro += ganho;
        fs.writeFileSync('./economia.json', JSON.stringify(econ, null, 2));
        return message.reply(`Resultado: **${result}** — Você ganhou ${ganho} coins!`);
      } else {
        if(bet > 0) econ[user.id].dinheiro -= bet;
        fs.writeFileSync('./economia.json', JSON.stringify(econ, null, 2));
        return message.reply(`Resultado: **${result}** — Você perdeu ${bet} coins.`);
      }
    } else {
      return message.reply(`Resultado: **${result}**`);
    }
  }
};

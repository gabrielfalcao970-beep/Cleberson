module.exports = {
  name: '8ball',
  description: 'Bola 8 mágica',
  async execute({ message, args }){
    if(!args.length) return message.reply('Faça uma pergunta!');
    const respostas = ['Sim','Não','Talvez','Com certeza','Duvido','Pergunte de novo'];
    message.reply(respostas[Math.floor(Math.random()*respostas.length)]);
  }
};

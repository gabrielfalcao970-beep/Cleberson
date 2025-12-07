module.exports = {
  name: 'roll',
  description: 'Rola dado: !roll 6 (1..6)',
  async execute({ message, args }){
    const max = args[0] ? parseInt(args[0]) : 6;
    if(isNaN(max) || max < 1) return message.reply('Use: !roll [n]');
    const result = Math.floor(Math.random()*max) + 1;
    message.reply(`🎲 Você rolou: ${result}`);
  }
};

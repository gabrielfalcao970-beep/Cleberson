module.exports = {
  name: 'ping',
  description: 'Responde Pong',
  async execute({ message }){
    message.reply('Pong! 🏓');
  }
};

module.exports = {
  name: 'criar-canal',
  description: 'Cria canal texto/voz: !criar-canal nome texto|voz',
  async execute({ message, args }){
    if(!message.member.permissions.has('ManageChannels')) return message.reply('Você não tem permissão.');
    const nome = args[0];
    const tipo = args[1] ? args[1].toLowerCase() : 'texto';
    if(!nome) return message.reply('Use: !criar-canal [nome] [texto|voz]');
    if(tipo === 'voz'){
      await message.guild.channels.create({ name: nome, type: 2 }).catch(()=> message.reply('Erro ao criar canal.'));
      message.reply('Canal de voz criado.');
    } else {
      await message.guild.channels.create({ name: nome, type: 0 }).catch(()=> message.reply('Erro ao criar canal.'));
      message.reply('Canal de texto criado.');
    }
  }
};

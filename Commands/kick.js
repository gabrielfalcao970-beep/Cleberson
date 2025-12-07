module.exports = {
  name: 'kick',
  description: 'Expulsa um usuário (admin): !kick @user',
  async execute({ message }){
    if(!message.member.permissions.has('KickMembers')) return message.reply('Você não tem permissão.');
    const member = message.mentions.members.first();
    if(!member) return message.reply('Marque alguém.');
    await member.kick().catch(()=> message.reply('Não consegui expulsar.'));
    message.reply(`${member.user.tag} foi expulso.`);
  }
};

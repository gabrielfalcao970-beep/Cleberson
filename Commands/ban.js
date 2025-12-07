module.exports = {
  name: 'ban',
  description: 'Bane um usuário (admin): !ban @user',
  async execute({ message }){
    if(!message.member.permissions.has('BanMembers')) return message.reply('Você não tem permissão.');
    const member = message.mentions.members.first();
    if(!member) return message.reply('Marque alguém.');
    await member.ban().catch(()=> message.reply('Não consegui banir.'));
    message.reply(`${member.user.tag} foi banido.`);
  }
};

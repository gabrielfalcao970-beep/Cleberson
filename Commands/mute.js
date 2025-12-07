module.exports = {
  name: 'mute',
  description: 'Silencia um usuário por X minutos (admin): !mute @user 10',
  async execute({ message, args }){
    if(!message.member.permissions.has('ModerateMembers') && !message.member.permissions.has('MuteMembers')) return message.reply('Você não tem permissão.');
    const member = message.mentions.members.first();
    if(!member) return message.reply('Marque alguém.');
    const min = args[1] ? parseInt(args[1]) : 10;
    const ms = min * 60 * 1000;
    await member.timeout(ms, 'Silenciado pelo bot').catch(()=> message.reply('Não consegui silenciar.'));
    message.reply(`${member.user.tag} silenciado por ${min} minutos.`);
  }
};

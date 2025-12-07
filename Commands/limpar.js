module.exports = {
  name: 'limpar',
  description: 'Apaga N mensagens (admin): !limpar 5',
  async execute({ message, args }){
    if(!message.member.permissions.has('ManageMessages') && !message.member.permissions.has('Administrator')) return message.reply('Você não tem permissão.');
    const n = args[0] ? Math.min(Math.max(parseInt(args[0]),1),100) : 1;
    await message.channel.bulkDelete(n+1).catch(e=> message.reply('Não foi possível apagar mensagens.'));
    const m = await message.channel.send(`🧹 Apagadas ${n} mensagens.`);
    setTimeout(()=> m.delete().catch(()=>{}),5000);
  }
};

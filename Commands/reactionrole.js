// uso: !reactionrole "Escolha sua idade:" 🔞:+18 👶:-18
module.exports = {
  name: 'reactionrole',
  description: 'Cria mensagem de reaction-role e salva no reactions.json',
  async execute({ message, args, fs }){
    if(!message.member.permissions.has('ManageRoles')) return message.reply('Você não tem permissão.');
    // formato simples: !reactionrole Mensagem 🔞:+18 👶:-18
    if(args.length < 2) return message.reply('Uso: !reactionrole Texto 🔞:RoleName 👶:RoleName2');
    // junta a mensagem até encontrar um emoji: detecta pelo padrão emoji:role
    let textParts = [];
    let mapParts = [];
    for(const a of args){
      if(a.includes(':')) mapParts.push(a);
      else textParts.push(a);
    }
    const texto = textParts.join(' ');
    const msg = await message.channel.send(texto);
    const mapping = {};
    const reactionsJson = JSON.parse(fs.readFileSync('./reactions.json','utf-8'));
    for(const pair of mapParts){
      const [emojiStr, roleName] = pair.split(':');
      const role = message.guild.roles.cache.find(r => r.name === roleName);
      if(!role) {
        message.channel.send(`Cargo "${roleName}" não encontrado. Crie-o primeiro.`);
        continue;
      }
      // adiciona reação (pode ser emoji unicode)
      await msg.react(emojiStr).catch(()=>{});
      mapping[emojiStr] = role.id;
    }
    reactionsJson[msg.id] = mapping;
    fs.writeFileSync('./reactions.json', JSON.stringify(reactionsJson, null, 2));
    message.reply('Mensagem de reaction-role criada.');
  }
};
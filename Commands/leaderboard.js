module.exports = {
  name: 'leaderboard',
  description: 'Mostra top coins',
  async execute({ message, fs }){
    const econ = JSON.parse(fs.readFileSync('./economia.json','utf-8'));
    const arr = Object.keys(econ).map(id => ({ id, dinheiro: econ[id].dinheiro || 0 }));
    arr.sort((a,b)=> b.dinheiro - a.dinheiro);
    const top = arr.slice(0,10);
    if(top.length === 0) return message.reply('Nenhum dado ainda.');
    let texto = '🏆 Top coins:\n';
    for(let i=0;i<top.length;i++){
      const member = await message.guild.members.fetch(top[i].id).catch(()=>null);
      const name = member ? member.user.username : `User(${top[i].id})`;
      texto += `${i+1}. ${name} — ${top[i].dinheiro} coins\n`;
    }
    message.reply(texto);
  }
};

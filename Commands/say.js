module.exports = {
  name: 'say',
  description: 'Faz o bot repetir a mensagem',
  async execute({ message, args }){
    if(!args.length) return message.reply('Escreva algo para eu repetir.');
    const texto = args.join(' ');
    await message.channel.send(texto);
    if(message.deletable) message.delete().catch(()=>{});
  }
};

module.exports = {
  name: 'menu',
  description: 'Mostra o menu de comandos',
  async execute({ message }){
    const menu = `
📜 **Comandos do Bot Gamer**

🎮 Diversão:
!ping, !coinflip, !slots, !roll, !8ball, !joke, !meme, !avatar, !say

💰 Economia:
!saldo, !daily, !pay, !loja, !comprar, !leaderboard

🏆 XP:
!level, !leaderboard

🛡️ Administração:
!limpar, !kick, !ban, !mute, !criar-canal, !criar-role

⚙️ Reações:
!reactionrole (cria mensagem com reações para atribuir cargos)

Use !comando para mais detalhes.
`;
    message.reply(menu);
  }
};
module.exports = {
  name: 'avatar',
  description: 'Mostra avatar de usuário: !avatar @user',
  async execute({ message }){
    const user = message.mentions.users.first() || message.author;
    message.reply(user.displayAvatarURL({ dynamic: true, size: 1024 }));
  }
};

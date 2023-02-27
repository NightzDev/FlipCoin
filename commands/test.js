const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flipcoin')
    .setDescription('Flipping Coin'),
  async execute(interaction) {
    const button = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('Heads')
          .setLabel('Heads')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('Tails')
          .setLabel('Tails')
          .setStyle('SUCCESS')
      );

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Flip Coin')
      .setDescription('Heads or Tails?')
      .setImage('https://media.tenor.com/H4qTvDzeYFoAAAAM/toss-coin-flip.gif');
      
    await interaction.reply({ embeds: [embed], components: [button] });

    const filter = (interaction) => {
      if (interaction.user.id === interaction.member.user.id) return true;
      interaction.deferReply();
      interaction.followUp({ content: 'You can only flip once!', ephemeral: true });
      return false;
    };
    
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 30000,
      max: 1,
      errors: ['time']
    });

    collector.on('collect', (interaction) => {
      console.log(interaction.customId);
	  const isHeads = Math.random() >= 0.5;
      const result = isHeads ? 'Heads' : 'Tails';
      if(interaction.customId == result){
		const resultEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Flip Coin - You win!!!')
        .setDescription(`You got ${result}!`)
        .setImage(`https://media.tenor.com/Z_IV0-4w2vEAAAAC/yes-winning.gif`);
      interaction.update({ embeds: [resultEmbed], components: [] });
	  } else {
		const resultEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Flip Coin - You lose!')
        .setDescription(`You got ${result}!`)
        .setImage(`https://media.tenor.com/JZFOk3kMAYsAAAAC/omg-loose.gif`);
      interaction.update({ embeds: [resultEmbed], components: [] });
	  }
      
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        const timeoutEmbed = new MessageEmbed()
          .setColor('RED')
          .setDescription('Time ran out. Try again.')
		      .setImage(`https://media1.tenor.com/images/84c0af37a154f20e12c9daee322bb46e/tenor.gif?itemid=13110745`);
        interaction.editReply({ embeds: [timeoutEmbed], components: [] });
      }
    });
  },
};

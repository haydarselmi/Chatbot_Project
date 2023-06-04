const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	console.log(message);
	message.reply({
		content :'General Kenobi',
	});
});

// eslint-disable-next-line no-undef
client.login('MTExNDU5MjY1MTM1NDg0NTI2NA.GCRHOl.CsOZhdaXOu-9W79XRMxYv_N1VCNTl2y5SA3Xi8');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	message.reply({
		content :'General Kenobi',
	});
}) ;

// eslint-disable-next-line no-undef
client.login('MTExMzE5NDA1MjQ5MDM3NTI3MA.G4xAcB.o3jHmFm0w6LaCuMgUfLGpDOJOF9m_hGEmR-FNQ');

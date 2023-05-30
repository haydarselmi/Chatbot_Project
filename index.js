// const RiveScript = require('rivescript');
// const pug = require('pug');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes.js');
const chatbotRoutes = require('./src/routes/chatbotRoutes.js');
/* Express configuration of the routes the html engine and folders */
const app = express();
app.use(cors());
global.loggedUser = null;
global.firstUnusedPort = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use('/chatbots', chatbotRoutes);
app.use('/users', userRoutes);
/* Express configuration of the routes the html engine and folders */

/* mongoose MangoDB database connection and configuration */
const db = mongoose.connection;
// connection to the database chatbot with mangoDB
(async () => {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/chatbot');
		console.log('connected successfully to mangoDB');
	}
	catch (error) {
		console.error(error.message);
	}
})();
// Logs errors on database error
db.on('error', console.error.bind(console, 'connection error: '));
// Logs if connected successfully to MangoDB
db.once('open', function() {
	console.log('Connected to MangoDB');
});
/* mongoose MangoDB database connection and configuration */

app.get('/', (req, res) => {
	if (global.loggedUser != null) {
		if (global.loggedUser.isAdmin != false) {
			res.render('chatbotPanel');
		}
	}
	else {
		res.render('login');
	}
});

// Displays the messengerPanel that is attached to a websocket and a botId
app.get('/messengerPanel/:bot_name/:bot_id/:port', (req, res) => {
	res.render('messengerPanel', {
		chatbot_name: req.params.bot_name,
		port: req.params.port,
		bot_id: req.params.bot_id,
	});
});

app.listen(3000, function() {
	console.log('Listening on port ' + 3000);
});

// var bot = new RiveScript();

// // Load a directory full of RiveScript documents (.rive files). This is for
// // Node.JS only: it doesn't work on the web!
// bot.loadDirectory("brains").then(loading_done).catch(loading_error);

// // Load an individual file.
// bot.loadFile("brains/standard.rive").then(loading_done).catch(loading_error);

// // Load a list of files all at once (the best alternative to loadDirectory
// // for the web!)
// bot.loadFile([
//   "brains/standard.rive"
// ]).then(loading_done).catch(loading_error);

// // All file loading operations are asynchronous, so you need handlers
// // to catch when they've finished. If you use loadDirectory (or loadFile
// // with multiple file names), the success function is called only when ALL
// // the files have finished loading.
// function loading_done() {
//   console.log("Bot has finished loading!");

//   // Now the replies must be sorted!
//   bot.sortReplies();

//   // And now we're free to get a reply from the brain!

//   // RiveScript remembers user data by their username and can tell
//   // multiple users apart.
//   let username = "local-user";

//   // NOTE: the API has changed in v2.0.0 and returns a Promise now.
//   bot.reply(username, "shut up").then(function(reply) {
//     console.log("The bot says: " + reply);
//   });
// }

// // It's good to catch errors too!
// function loading_error(error, filename, lineno) {
//   console.log("Error when loading files: " + error);
// }
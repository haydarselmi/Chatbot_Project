const list = document.getElementById('bots');

try {
	fetch('http://localhost:3000/chatbots', { method: 'GET' })
		.then(response => response.json())
		.then(response => {
			let li;
			let a;
			response.forEach(bot => {
				li = document.createElement('li');
				a = document.createElement('a');
				a.innerHTML = bot.name;
				a.id = bot._id;
				// a.href = 'http://localhost:3000/chatbots/mouth/' + bot._id;
				a.addEventListener('click', () => {
					fetch(`http://localhost:3000/chatbots/mouth/${bot._id}`)
						.then(response => response.json())
						.then(response => {
							console.log(response);
							location.href = `http://localhost:3000/messengerPanel/${response.bot_id}/${response.port}`;
						})
						.catch (error => {
							console.error(error);
						});
				});
				li.appendChild(a);
				list.append((li));
			});
		});
}
catch (error) {
	console.error('Error while fetching for all chatbots');
}
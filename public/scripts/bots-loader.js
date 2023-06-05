// const list = document.getElementById('bots');
const list = document.getElementsByClassName('chatbot-element');
const modifyButtons = document.getElementsByClassName('bot-modify-button');
const modifyModal = document.getElementById('chatbot-modify-modal');
let modalId = document.getElementById('modify-bot-id');
const selectBrains = document.getElementById('brain-select');
const selectedBrains = document.getElementById('selected-brains');
const validateButton = document.getElementById('modify-validate-button');
try {
	// fetch('http://localhost:3000/chatbots', { method: 'GET' })
	// 	.then(response => response.json())
	// 	.then(response => {
	// 		let li;
	// 		let a;
	// 		response.forEach(bot => {
	// 			li = document.createElement('li');
	// 			a = document.createElement('a');
	// 			a.innerHTML = bot.name;
	// 			a.id = bot._id;
	// 			// a.href = 'http://localhost:3000/chatbots/mouth/' + bot._id;
	// 			a.addEventListener('click', () => {
	// 				fetch(`http://localhost:3000/chatbots/mouth/${bot._id}`)
	// 					.then(response => response.json())
	// 					.then(response => {
	// 						console.log(response);
	// 						location.href = `http://localhost:3000/messengerPanel/${response.chatbot.name}/${response.bot_id}/${response.port}`;
	// 					})
	// 					.catch (error => {
	// 						console.error(error);
	// 					});
	// 			});
	// 			li.appendChild(a);
	// 			list.append((li));
	// 		});
	// 	});
	Array.from(list).forEach(a => {
		a.addEventListener('click', () => {
			fetch(`http://localhost:3000/chatbots/mouth/${a.id}`)
				.then(response => response.json())
				.then(response => {
					location.href = `http://localhost:3000/messengerPanel/${response.chatbot.name}/${response.bot_id}/${response.port}`;
				})
				.catch (error => {
					console.error(error);
				});
		});
	});
	Array.from(modifyButtons).forEach(button => {
		button.addEventListener('click', () => {
			modifyModal.hidden = !modifyModal.hidden;
			modalId.innerHTML = button.value;
			selectBrains.innerHTML = null;
			fetch(`http://localhost:3000/chatbots/options/brains`)
				.then(response => response.json())
				.then(response => {
					fetch(`http://localhost:3000/chatbots/${modalId.innerHTML}`)
						.then(res => res.json())
						.then(res => {
							console.log(res);
							console.log(response);
							selectedBrains.innerHTML = res[0].brains_paths;
							response.brains_list.forEach(brain => {
								if (!res[0].brains_paths.includes(brain)) {
									const option = document.createElement('option');
									option.value = brain;
									option.innerHTML = brain;
									selectBrains.appendChild(option);
								}
							});
						});
					// response.brains_list.forEach(brain => {
					// 	if(brain. == bot)
					// });
				})
				.catch(error => {
					console.error(error);
				});
		});
	});
	selectBrains.addEventListener('change', (selected) => {
		console.log(selectBrains.value);
		if (!selectedBrains.innerHTML.includes(selectBrains.value)) {
			selectedBrains.innerHTML += ',' + selectBrains.value;
		}
	});
	validateButton.addEventListener('click', () => {
		fetch(`http://localhost:3000/chatbots/brains/${modalId.innerHTML}`, {
			method: 'PATCH',
			mode: 'same-origin', // no-cors, *cors, same-origin
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({ brains: selectedBrains.innerHTML }),
		})
			.then(response => response.json())
			.then(response => {
				modifyModal.hidden = !modifyModal.hidden;
				alert('The chatbot has been edited');
			});
	});
}
catch (error) {
	console.error('Error while fetching for all chatbots');
}
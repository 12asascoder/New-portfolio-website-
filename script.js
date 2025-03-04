// script.js
const apiKey = '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'; // Replace with your OpenAI API key
const apiUrl = 'https://api.openai.com/v1/chat/completions';

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const userInput = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');

  if (userInput.value.trim() === '') return;

  // Display user message
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerHTML = `<p>${userInput.value}</p>`;
  chatBox.appendChild(userMessage);

  // Clear input
  const userText = userInput.value;
  userInput.value = '';

  // Get bot response from OpenAI API
  try {
    const botResponse = await getBotResponse(userText);
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.innerHTML = `<p>${botResponse}</p>`;
    chatBox.appendChild(botMessage);
  } catch (error) {
    console.error('Error fetching bot response:', error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message', 'bot');
    errorMessage.innerHTML = `<p>Sorry, something went wrong. Please try again.</p>`;
    chatBox.appendChild(errorMessage);
  }

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // Use the GPT-3.5 model
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
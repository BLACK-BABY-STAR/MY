async function getResponse() {
  const userInput = document.getElementById('userInput').value;
  const chatWindow = document.getElementById('chatWindow');

  // Append user message to chat window
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerText = userInput;
  chatWindow.appendChild(userMessage);

  // Clear the input field
  document.getElementById('userInput').value = '';

  const response = await fetch('/getMedicalInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: userInput })
  });

  const data = await response.json();

  // Append bot response to chat window
  const botMessage = document.createElement('div');
  botMessage.classList.add('message', 'bot');
  botMessage.innerText = data.response;
  chatWindow.appendChild(botMessage);

  // Scroll to the bottom of the chat window
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

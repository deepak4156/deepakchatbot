const chatsContainer = document.querySelector('.chats-container');
const promptForm = document.querySelector('.prompt-form');
const promptInput = document.querySelector('.prompt-input');
const API_KEY = "AIzaSyBK7FiFYl-syhYWh0a6_qF82dELbsL68UE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

let userMessage = "";

const chatHistory = [];

//function to create a message element
const createMsgElement = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

const generateResponse = async (botMsgDIV) => {
    const textElement = botMsgDIV.querySelector('.message-text');

    //add the user message to the chat history
    chatHistory.push({
        role: "user",
        parts: [{text: userMessage}]
    })
    try {
        //get the response from the server
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({contents: chatHistory})
        });

        const data = await response.json();
        if(response.ok) throw new Error(data.error.message);

        //process the response and send it 
        const responseText = data.candidates[0].content[0].parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        textElement.textContent = responseText;
    } catch (error) {
        console.log(error);
    }
}


//handle the form submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.ariaValueMax.trim();

    if (!userMessage) {
        return;
    };

    promptInput.value = '';

    const userMsgHTML = `<p class="message-text"></p>`;
        const userMsgDiv = createMsgElement(userMsgHTML, 'user-message');
        userMsgDiv.querySelector('.message-text').textContent = userMessage;
        chatsContainer.appendChild(userMsgDiv);


    setTimeout(() => {
        //generate user message html and add in the chats container
        const botMsgHTML = `<img src="gemini.svg" alt="" class="avatar"><p class="message-text">Just a sec....</p>`;
        const botMsgDiv = createMsgElement(botMsgHTML, 'bot-message', "loading");
        chatsContainer.appendChild(botMsgDiv);
        generateResponse(botMsgDiv);
    }, 600);
}

promptForm = addEventListener('Submit', handleFormSubmit);
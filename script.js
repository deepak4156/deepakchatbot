const chatsContainer = document.querySelector('.chats-container');
const promptForm = document.querySelector('.prompt-form');
const promptInput = document.querySelector('.prompt-input');

let userMessage = "";

//function to create a message element
const createMsgElement = (content, className) =>{
    const div = document.createElement('div');
    div.classList.add("message",className);
    div.innerHTML = content;
    return div;
}


//handle the form submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.ariaValueMax.trim();

    if(!userMessage) {
        return;
    };

    //generate user message html and add in the chats container
    const userMsgHTML = `<p class="message-text"></p>`;
    const userMsgDiv = createMsgElement(userMsgHTML, 'user-message');
    userMsgDiv.querySelector('.message-text').textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv);
}

promptForm=addEventListener('submit', handleFormSubmit);
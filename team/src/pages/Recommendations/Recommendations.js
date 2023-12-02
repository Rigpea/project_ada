// Create elements
const label = document.createElement('label');
label.setAttribute('for', 'userInput');
label.textContent = 'Please input your goals for the week (500 characters max):';

const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'userInput');
textarea.setAttribute('maxlength', '500');

const outputTitle = document.createElement('h2');
outputTitle.textContent = 'Our suggestion:';

const outputBox = document.createElement('div');
outputBox.setAttribute('id', 'outputBox');

// Append elements to the body
document.body.appendChild(label);
document.body.appendChild(textarea);
document.body.appendChild(outputTitle);
document.body.appendChild(outputBox);

// Function to handle user input and get suggestion from GPT
async function processInput() {
    // Get user input
    const userInput = document.getElementById('userInput').value;

    // Call your API or GPT.js file to get a response
    const gptResponse = await getGPTResponse(userInput);

    // Display the response in the output box
    document.getElementById('outputBox').innerText = gptResponse;
}

// Simulate your API call to GPT
async function getGPTResponse(input) {
    // You should replace this with your actual API call or GPT.js logic
    // For now, let's assume GPT.js has a function called getResponse
    // that returns a Promise resolving to the suggestion
    return await getResponse(input);
}

// Attach the processInput function to the input event of the textarea
document.getElementById('userInput').addEventListener('input', processInput);

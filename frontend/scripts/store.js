import {USER_MESSAGES} from "../lang/messages/en/user.js"

const notification = document.getElementById("user_notification");
const submit_button = document.getElementById("submit_form");
const submission_text = document.getElementById("notification_text");

// Need to edit for error message
function handleFormSubmit(){
    event.preventDefault(); // stop form from refreshing the page (clears error msg rn)

    const word = document.getElementById("word");
    const definition = document.getElementById("definition");

    // Check if word and definition is valid.
    if (!word || !definition) {
        notification.display= "block";
        submission_text.innerText = USER_MESSAGES.INVALID_INPUT
        return;
    }

    // To do: Send data to backend api
    // Handle success
    // Handle failure

    setTimeout(() => {
        notification.style.display="block"
        notification_text.innerText = USER_MESSAGES.SUCCESS_MSG
    }, 1000);
}

submit_button.addEventListener("click", handleFormSubmit)

window.onload = () => {
    document.getElementById("word_label").innerHTML = USER_MESSAGES.WORD_LABEL;
    document.getElementById("definition_label").innerHTML = USER_MESSAGES.DEFINITION_LABEL;
    document.getElementById("submit_form").value = USER_MESSAGES.BUTTON_LABEL;
};
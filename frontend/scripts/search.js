import { USER_MESSAGES } from "../lang/messages/en/user.js";

const notification = document.getElementById("user_notification");
const submit_button = document.getElementById("search_button");
const notification_text = document.getElementById("notification_text");
const search_input = document.getElementById("search_input");
const result_container = document.getElementById("result_container");

function handleSearch() {
    // event.preventDefault(); 

    const query = search_input.value.trim();

    // Clear previous results
    result_container.innerHTML = "";

    // Hide notification initially
    notification.style.display = "none";

    // Validate input
    if (!query) {
        notification.style.display = "block";
        notification_text.innerText = USER_MESSAGES.INVALID_SEARCH_INPUT;
        return;
    }

    // Todo: GET request here

    // Placeholder success message
    setTimeout(() => {
        notification.style.display = "block";
        notification_text.innerText = USER_MESSAGES.SEARCH_MESSAGE + `${query}`
    }, 500);
}


submit_button.addEventListener("click", handleSearch);

window.onload = () => {
    submit_button.innerText = USER_MESSAGES.SEARCH_LABEL;
};

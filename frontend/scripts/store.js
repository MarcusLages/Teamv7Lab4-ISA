import { USER_MESSAGES } from "../lang/messages/en/user.js";

const notification = document.getElementById("user_notification");
const submission_text = document.getElementById("notification_text");
const submit_button = document.getElementById("submit_form");

const API_URL = "https://mvslages.com/v1/definitions";

// Helper to show notification
function showNotification(message, isError = false) {
    notification.style.display = "block";
    submission_text.innerText = message;
    submission_text.style.color = isError ? "red" : "green";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form refresh

    const word_input = document.getElementById("word");
    const definition_input = document.getElementById("definition");

    const word = word_input.value.trim();
    const definition = definition_input.value.trim();

    // Validation
    if (!word || !definition) {
        showNotification(USER_MESSAGES.INVALID_INPUT, true);
        return;
    }

    // Only accept letters for word
    if (!/^[a-zA-Z]+$/.test(word)) {
        showNotification(USER_MESSAGES.INVALID_TYPE, true);
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ word, definition }),
        });

        const data = await response.json();

        if (data.status === "success") {
            // Success -> new word (201) or duplicate (200 with warning)
            if (data.data.warning) {
                showNotification(data.data.warning, false);
            } else {
                showNotification(USER_MESSAGES.SUCCESS_MSG, false);
            }

            // Reset fields so user can enter another word:definiton
            document.getElementById("word").value = "";
            document.getElementById("definition").value = "";

        } else {
            showNotification(data.data || USER_MESSAGES.UNKNOWN_ERROR, true);
        }
    } catch (err) {
        showNotification(USER_MESSAGES.NETWORK_ERROR, true);
        console.error(err);
    }
}

submit_button.addEventListener("click", handleFormSubmit);

window.onload = () => {
    document.getElementById("word_label").innerHTML = USER_MESSAGES.WORD_LABEL;
    document.getElementById("definition_label").innerHTML = USER_MESSAGES.DEFINITION_LABEL;
    document.getElementById("submit_form").innerText = USER_MESSAGES.BUTTON_LABEL;
};

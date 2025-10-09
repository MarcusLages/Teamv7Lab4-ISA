import { USER_MESSAGES } from "../lang/messages/en/user.js";

const notification = document.getElementById("user_notification");
const submit_button = document.getElementById("search_button");
const notification_text = document.getElementById("notification_text");
const search_input = document.getElementById("search_input");
const result_container = document.getElementById("result_container");

const API_URL = "https://mvslages.com/v1/definitions";

// Helper to show notification
function showNotification(message, isError = false) {
    notification.style.display = "block";
    notification_text.innerText = message;
    notification_text.style.color = isError ? "red" : "green";
}

// Perform GET request to fetch word definition
async function handleSearch(event) {
    event.preventDefault(); // Prevent form refresh (if inside a form)

    const query = search_input.value.trim().toLowerCase();

    // Clear previous results
    result_container.innerHTML = "";
    notification.style.display = "none";

    // Validate input
    if (!query) {
        showNotification(USER_MESSAGES.INVALID_SEARCH_INPUT, true);
        return;
    }

    // Check if query contains only letters (no numbers or special chars)
    if (!/^[a-zA-Z]+$/.test(query)) {
        showNotification(USER_MESSAGES.INVALID_TYPE, true);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/?word=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.status === "success") {
            
            // Word found
            if (data.code === 200 && data.data.word && data.data.definition) {
                result_container.innerHTML = `
                    <p><strong>${data.data.word}:</strong> ${data.data.definition}</p>
                `;
            }
            else if (data.code === 404) {
                showNotification(data.data || "Word not found.", true);
            }
        } else {
            showNotification(`${query} not found in dictionary.`, true);
        }
    } catch (err) {
        showNotification(USER_MESSAGES.NETWORK_ERROR, true);
        console.error(err);
    }
}

submit_button.addEventListener("click", handleSearch);

window.onload = () => {
    submit_button.innerText = USER_MESSAGES.SEARCH_LABEL;
};

const $contactForm = document.querySelector("#contact-form");
const $submitButton = document.querySelector("#submit-button");
const $resultMessage = document.querySelector("#result-message");
const URL = "http://localhost:3000/send";

let userName = document.querySelector("#user-name");
let userEmail = document.querySelector("#user-email");
let userMessage = document.querySelector("#user-message");

$contactForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  $submitButton.disabled = true;
  try {
    if (validateInputs()) {
      const body = {
        [userName.name]: userName.value,
        [userEmail.name]: userEmail.value,
        [userMessage.name]: userMessage.value,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(URL, options);
      const data = await response.json();

      createMessage(data);
      $contactForm.reset();
    }
  } catch (error) {
    console.log(error);
  }
  $submitButton.disabled = false;
});

function validateInputs() {
  if (userName.value && userEmail.value && userMessage.value) {
    return true;
  } else {
    console.log("Complete all fields");
    return false;
  }
}

function createMessage({ message, success }) {
  removeMessage();
  const messageElement = document.createElement("p");
  messageElement.innerText = message;
  $resultMessage.appendChild(messageElement);
  success
    ? messageElement.classList.add("alert", "alert-success")
    : messageElement.classList.add("alert", "alert-danger");
}

function removeMessage() {
  $resultMessage
    .querySelectorAll("*")
    .forEach((nodeElement) => nodeElement.remove());
}

document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let firstName = document.querySelector('input[type="text"]').value;
        let email = document.querySelector('input[type="email"]').value;
        let message = document.querySelector("textarea").value;

        if (firstName === "" || email === "" || message === "") {
            alert("Please fill all required fields");
        } else {
            alert("Message sent successfully");
        }
    });

    let nav = document.querySelector("header");
});
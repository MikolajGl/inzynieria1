document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;

    if (username.trim() === '') {
        alert('Please enter a username');
        return;
    }

    // Przekierowanie do chat.html z nazwą użytkownika w parametrze URL
    window.location.href = `chat.html?username=${username}`;
});
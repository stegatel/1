function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Невірний логін або пароль!');
    }
}

// Check if already logged in
if (localStorage.getItem('adminAuth') === 'true') {
    window.location.href = 'dashboard.html';
}

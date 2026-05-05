const updateError = (id, msg = '') => {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
};

const showToast = (id) => {
    const t = document.getElementById(id);
    if (t) {
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    }
};

const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
const saveUser = (user) => localStorage.setItem('users', JSON.stringify([...getUsers(), user]));

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        document.getElementById('userName').value = remembered;
        document.getElementById('remember').checked = true;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateError('error-msg');

        const emailInput = document.getElementById('userName').value.trim().toLowerCase();
        const passInput = document.getElementById('userPass').value;
        const remember = document.getElementById('remember').checked;

        const user = getUsers().find(u => u.email.toLowerCase() === emailInput);
        if (!user) return updateError('error-msg', '✗ Email not found. Please register.');
        if (user.password !== passInput) return updateError('error-msg', '✗ Incorrect password.');

        remember
            ? localStorage.setItem('rememberedUser', emailInput)
            : localStorage.removeItem('rememberedUser');

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showToast('toast');
        setTimeout(() => location.href = 'index.html', 1500);
    });
}

const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateError('error-msg');

        const data = {
            firstName: document.getElementById('user-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            email: document.getElementById('user-email').value.trim().toLowerCase(),
            password: document.getElementById('newPass').value,
            conf: document.getElementById('confPass').value
        };

        if (!data.email || !data.password) return updateError('error-msg', '⚠ Fields are required.');
        if (data.password !== data.conf) return updateError('error-msg', '✗ Passwords do not match.');
        if (getUsers().find(u => u.email === data.email)) return updateError('error-msg', '✗ This email is already registered.');
        if (data.password.length < 8) return updateError('error-msg', '⚠ Password must be at least 8 characters long.');

        saveUser(data);
        showToast('toast');
        setTimeout(() => location.href = 'logIn.html', 1500);
    });
}
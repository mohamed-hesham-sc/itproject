const themeToggle = document.getElementById('profile-theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-theme', this.checked);
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

const user = JSON.parse(localStorage.getItem('loggedInUser'));

if (user) {
    const full = user.firstName + ' ' + user.lastName;

    document.getElementById('profile-welcome-name').textContent = user.firstName;
    document.getElementById('profile-card-name').textContent = full;
    document.getElementById('profile-info-name').textContent = full;
    document.getElementById('profile-info-email').textContent = user.email;

    document.querySelector('.profile-avatar').innerHTML =
        `<span>${user.firstName[0].toUpperCase()}</span>`;
}

const notifToggle = document.getElementById('profile-notif-toggle');
const newsToggle = document.getElementById('profile-news-toggle');

if (notifToggle) notifToggle.checked = localStorage.getItem('notif') !== 'false';
if (newsToggle) newsToggle.checked = localStorage.getItem('news') === 'true';

notifToggle?.addEventListener('change', () =>
    localStorage.setItem('notif', notifToggle.checked)
);

newsToggle?.addEventListener('change', () =>
    localStorage.setItem('news', newsToggle.checked)
);

function toggleEdit() {
    const form = document.getElementById('profile-edit-form');
    const show = form.style.display !== 'block';

    if (show) {
        document.getElementById('profile-edit-name').value =
            document.getElementById('profile-info-name').textContent;

        document.getElementById('profile-edit-email').value =
            document.getElementById('profile-info-email').textContent;

        document.getElementById('profile-edit-phone').value =
            document.getElementById('profile-info-phone').textContent;

        document.getElementById('profile-edit-country').value =
            document.getElementById('profile-info-country').textContent;
    }

    form.style.display = show ? 'block' : 'none';
}

function saveProfile() {
    const name = document.getElementById('profile-edit-name').value.trim();
    const email = document.getElementById('profile-edit-email').value.trim();
    const phone = document.getElementById('profile-edit-phone').value.trim();
    const country = document.getElementById('profile-edit-country').value.trim();

    if (name.length < 3) return alert('Name must be at least 3 characters.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Invalid email.');
    if (!phone) return alert('Phone cannot be empty.');

    document.getElementById('profile-info-name').textContent = name;
    document.getElementById('profile-info-email').textContent = email;
    document.getElementById('profile-info-phone').textContent = phone;
    document.getElementById('profile-info-country').textContent = country;

    document.getElementById('profile-card-name').textContent = name;
    document.getElementById('profile-edit-form').style.display = 'none';

    const stored = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ ...stored, name, email, phone, country })
    );
}

const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

if (bookings.length) {
    document.getElementById('profile-no-bookings-row').style.display = 'none';

    const tbody = document.getElementById('profile-bookings-body');
    let total = 0;

    bookings.forEach(b => {
        total += b.price;

        tbody.insertAdjacentHTML(
            'beforeend',
            `<tr>
                <td>#${b.id}</td>
                <td>${b.destination}</td>
                <td>${b.date}</td>
                <td>${b.guests}</td>
                <td>$${b.price}</td>
                <td><span class="status-badge status-${b.status}">${b.status}</span></td>
            </tr>`
        );
    });
}

document.getElementById('sign-out-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    location.href = 'logIn.html';
});
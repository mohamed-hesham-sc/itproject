const themeInput = document.getElementById('profile-theme-toggle');
const mainWrapper = document.querySelector('.body');



window.onload = function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme === 'dark') {
        mainWrapper.classList.add('dark-mode');
        themeInput.checked = true; 
    }
};






themeInput.onchange = function() {
    if (this.checked) {
        mainWrapper.classList.add('dark-mode');
        localStorage.setItem('selectedTheme', 'dark');
    } else {
        mainWrapper.classList.remove('dark-mode');
        localStorage.setItem('selectedTheme', 'light');
    }
};


window.onload = function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme === 'dark') {
        mainWrapper.classList.add('dark-mode');
        themeInput.checked = true; 
    }
};
const toggleButton = document.querySelector('.dark-mode-toggle');

function toggleDarkMode() {
  const body = document.querySelector('body');
  body.classList.toggle('dark-mode');
}

toggleButton.addEventListener('click', toggleDarkMode);

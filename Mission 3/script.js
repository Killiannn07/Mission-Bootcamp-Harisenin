function togglePassword(button) {
  const passwordWrapper = button.parentElement;
  const passwordInput = passwordWrapper.querySelector('.password-input');
  const img = button.querySelector('img');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    img.src = './assets/eye-off.svg';
  } else {
    passwordInput.type = 'password';
    img.src = './assets/eye-off.svg';
  }
}

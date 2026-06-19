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

// Carousel functionality
function initializeCarousels() {
  const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
  
  carouselWrappers.forEach(wrapper => {
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    const track = wrapper.querySelector('.carousel-track');
    
    if (!prevBtn || !nextBtn || !track) return;
    
    // Cek apakah ini portrait atau landscape
    let scrollAmount = 260; // untuk landscape
    const firstCard = track.querySelector('.movie-card');
    if (firstCard && firstCard.classList.contains('card-portrait')) {
      scrollAmount = 160;
    }
    
    prevBtn.addEventListener('click', () => {
      track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextBtn.addEventListener('click', () => {
      track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Update button disabled state
    const updateButtonState = () => {
      prevBtn.classList.toggle('disabled', track.scrollLeft === 0);
      nextBtn.classList.toggle(
        'disabled',
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 10
      );
    };
    
    track.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);
    updateButtonState();
  });
}

// Footer accordion toggle
document.addEventListener('DOMContentLoaded', function() {
  const footerToggles = document.querySelectorAll('.footer-toggle');
  
  footerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const footerGroup = this.closest('.footer-group');
      footerGroup.classList.toggle('open');
    });
  });

  initializeCarousels();
});

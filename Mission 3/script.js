// function show hide password
function togglePassword(button) {
  const passwordWrapper = button.parentElement;
  const passwordInput = passwordWrapper.querySelector(".password-input");
  const img = button.querySelector("img");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    img.src = "./assets/eye-off.svg";
  } else {
    passwordInput.type = "password";
    img.src = "./assets/eye-off.svg";
  }
}

// function carousel
function initializeCarousels() {
  const carouselWrappers = document.querySelectorAll(".carousel-wrapper");

  carouselWrappers.forEach((wrapper) => {
    const prevBtn = wrapper.querySelector(".carousel-btn.prev");
    const nextBtn = wrapper.querySelector(".carousel-btn.next");
    const track = wrapper.querySelector(".carousel-track");

    if (!prevBtn || !nextBtn || !track) return;

    let scrollAmount = 260;
    const firstCard = track.querySelector(".movie-card");
    if (firstCard && firstCard.classList.contains("card-portrait")) {
      scrollAmount = 160;
    }

    prevBtn.addEventListener("click", () => {
      track.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    // Update button disabled state
    const updateButtonState = () => {
      prevBtn.classList.toggle("disabled", track.scrollLeft === 0);
      nextBtn.classList.toggle(
        "disabled",
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 10,
      );
    };

    track.addEventListener("scroll", updateButtonState);
    window.addEventListener("resize", updateButtonState);
    updateButtonState();
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousels
  initializeCarousels();

  // Avatar dropdown toggle
  const avatarSection = document.querySelector(".avatar");
  if (avatarSection) {
    const avatarImg = avatarSection.querySelector('img[src*="avatar"]');
    const arrowImg = avatarSection.querySelector(".arrow");

    // Toggle dropdown saat avatar atau arrow diklik
    [avatarImg, arrowImg].forEach((el) => {
      if (el) {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          avatarSection.classList.toggle("active");
        });
      }
    });

    // Tutup dropdown saat klik di luar
    document.addEventListener("click", () => {
      avatarSection.classList.remove("active");
    });
  }

  // Footer accordion toggle
  const dropdownHeaders = document.querySelectorAll(".link-group h3");

  dropdownHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      // Cari elemen induknya (.link-group)
      const parentGroup = header.parentElement;

      // Tambah/hapus class 'active' saat diklik
      parentGroup.classList.toggle("active");
    });
  });
});

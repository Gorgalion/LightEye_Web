// ===== Contact API =====
const SUPABASE_URL = 'https://dmgrtelenzicijfpyaih.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtZ3J0ZWxlbnppY2lqZnB5YWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNjYyMzksImV4cCI6MjEwMzg0MjIzOX0.a32zQxeVcoc3S0UhXk8_EHAmepqtlWePMvSN3_rDYi0';

// ===== Navbar =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;

    navbar.classList.toggle('scrolled', currentScrollY > 20);

    if (currentScrollY <= 0) {
      navbar.classList.remove('hidden');
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

// ===== Mobile menu =====
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const openIcon = toggle.querySelector('.menu-open-icon');
  const closeIcon = toggle.querySelector('.menu-close-icon');

  const setOpen = (open) => {
    menu.style.display = open ? 'block' : 'none';
    openIcon.style.display = open ? 'none' : '';
    closeIcon.style.display = open ? '' : 'none';
  };

  toggle.addEventListener('click', () => setOpen(menu.style.display === 'none'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
}

// ===== Pilot contact modal =====
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const modalBody = document.getElementById('modalBody');
  const success = document.getElementById('modalSuccess');
  const form = document.getElementById('contactForm');
  const error = document.getElementById('formError');
  const submit = document.getElementById('submitBtn');

  const open = () => {
    modalBody.style.display = '';
    success.style.display = 'none';
    error.style.display = 'none';
    form.reset();
    submit.disabled = false;
    submit.textContent = 'Send message';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  document.getElementById('modalBackdrop').addEventListener('click', close);
  document.getElementById('modalClose').addEventListener('click', close);
  document.getElementById('modalSuccessClose').addEventListener('click', close);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display !== 'none') close();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const organization = document.getElementById('fOrg').value.trim();
    const message = document.getElementById('fMessage').value.trim();

    if (!name || !email || !message) return;

    submit.disabled = true;
    submit.textContent = 'Sending...';
    error.style.display = 'none';

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name,
          email,
          organization: organization || null,
          message,
          interest: 'pilot',
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      modalBody.style.display = 'none';
      success.style.display = 'flex';
    } catch {
      error.style.display = 'flex';
      submit.disabled = false;
      submit.textContent = 'Send message';
    }
  });
}

// ===== Footer =====
document.getElementById('year').textContent = new Date().getFullYear();

initNavbar();
initMobileMenu();
initContactModal();

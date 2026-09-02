const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const params = new URLSearchParams(window.location.search);
if (params.get('quote') === 'success') {
  const form = document.getElementById('quoteForm');
  if (form) {
    const success = document.createElement('div');
    success.className = 'form-success';
    success.textContent = 'Thank you. Your Coast Bins service request was sent successfully.';
    form.prepend(success);
  }
}

const customerType = document.getElementById('customerType');
const serviceType = document.getElementById('serviceType');
const portfolioField = document.getElementById('portfolioField');

function updatePortfolioField() {
  const isPortfolio =
    customerType?.value === 'Property Manager' ||
    customerType?.value === 'Apartment / Condo Community' ||
    customerType?.value === 'HOA / Community Association' ||
    serviceType?.value === 'Property Management' ||
    serviceType?.value === 'Multifamily / Community';
  portfolioField?.classList.toggle('show', isPortfolio);
}
customerType?.addEventListener('change', updatePortfolioField);
serviceType?.addEventListener('change', updatePortfolioField);

document.querySelectorAll('[data-service="Property Management"]').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(() => {
      if (customerType) customerType.value = 'Property Manager';
      if (serviceType) serviceType.value = 'Property Management';
      updatePortfolioField();
    }, 50);
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const requestedService = link.getAttribute('data-service');
    setTimeout(() => {
      const serviceSelect = document.getElementById('serviceType');
      if (serviceSelect && requestedService) {
        const match = Array.from(serviceSelect.options).find(o => o.value === requestedService || o.text === requestedService);
        if (match) serviceSelect.value = match.value;
      }
    }, 50);
  });
});

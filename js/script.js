// Navigation mobile commune a toutes les pages.
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Fermer' : 'Menu';
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'Menu';
  });
});

document.querySelectorAll('.add-product').forEach((button) => {
  button.addEventListener('click', () => {
    // Le panier est partage entre la boutique et la page de validation.
    const notice = document.querySelector('.cart-notice');
    const product = button.dataset.product;
    const prices = { 'Œufs plein air': 3.2, 'Panier de saison': 18, 'Colis de bœuf': 52 };
    const cart = JSON.parse(localStorage.getItem('pres-vivants-cart') || '[]');
    const item = cart.find((entry) => entry.name === product);
    if (item) item.quantity += 1;
    else cart.push({ name: product, price: prices[product], quantity: 1 });
    localStorage.setItem('pres-vivants-cart', JSON.stringify(cart));
    if (notice) notice.textContent = `${product} a été ajouté à votre panier.`;
    button.textContent = 'Ajouté au panier';
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  // Demonstration locale : le formulaire affiche une confirmation sans serveur.
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('.form-message');
    message.textContent = 'Merci pour votre message. Nous vous répondrons rapidement.';
    event.target.reset();
  });
}

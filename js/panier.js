// Le panier client et les commandes utilisent deux tables locales distinctes.
const cartKey = 'pres-vivants-cart';
const ordersKey = 'pres-vivants-orders';
let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
const itemsContainer = document.querySelector('#cart-items');
const emptyContainer = document.querySelector('#cart-empty');
const totalElement = document.querySelector('#cart-total');
const countElement = document.querySelector('#cart-count');

const money = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
const saveCart = () => localStorage.setItem(cartKey, JSON.stringify(cart));

function renderCart() {
  // Recalcule les quantites, le total et le contenu affiche apres chaque action.
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  countElement.textContent = itemCount;
  totalElement.textContent = money(total);
  emptyContainer.hidden = cart.length > 0;
  itemsContainer.innerHTML = cart.map((item) => `<article class="cart-row"><div><h3>${item.name}</h3><small>${money(item.price)} l'unité</small></div><div class="quantity-control"><button type="button" data-action="decrease" data-name="${item.name}" aria-label="Retirer une unité">−</button><span>${item.quantity}</span><button type="button" data-action="increase" data-name="${item.name}" aria-label="Ajouter une unité">+</button></div><strong>${money(item.price * item.quantity)}</strong><button type="button" class="remove-item" data-action="remove" data-name="${item.name}" aria-label="Supprimer ${item.name}">×</button></article>`).join('');
}

itemsContainer.addEventListener('click', (event) => {
  // Delegation d'evenement pour les boutons ajoutes dynamiquement.
  const button = event.target.closest('button');
  if (!button) return;
  const item = cart.find((entry) => entry.name === button.dataset.name);
  if (!item) return;
  if (button.dataset.action === 'increase') item.quantity += 1;
  if (button.dataset.action === 'decrease') item.quantity -= 1;
  if (button.dataset.action === 'remove' || item.quantity < 1) cart = cart.filter((entry) => entry.name !== button.dataset.name);
  saveCart();
  renderCart();
});

document.querySelector('#checkout-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!cart.length) {
    document.querySelector('#checkout-message').textContent = 'Ajoutez au moins un produit avant de valider.';
    return;
  }
  // Transforme le panier en commande exploitable par le tableau d'administration.
  const data = new FormData(event.target);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const response = await fetch('../api/orders.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer: data.get('customer'), phone: data.get('phone'), email: data.get('email'), products: cart.map((item) => `${item.quantity} × ${item.name}`).join(', '), pickup: new Date().toISOString().slice(0, 10), pickupSlot: data.get('pickup'), total })
  });
  if (!response.ok) {
    document.querySelector('#checkout-message').textContent = 'La commande n’a pas pu être enregistrée.';
    return;
  }
  const { order } = await response.json();
  cart = [];
  saveCart();
  renderCart();
  event.target.reset();
  document.querySelector('#checkout-message').textContent = `Commande ${order.id} enregistrée. La ferme va vous confirmer le retrait.`;
});

renderCart();

// Base de donnees locale de demonstration : elle pourra etre remplacee par une API.
const ordersKey = 'pres-vivants-orders';
const defaultOrders = [
  { id: 'CMD-1042', customer: 'Claire Martin', phone: '06 12 34 56 78', products: 'Panier de saison, 1 boîte d’œufs', pickup: '2026-09-18', total: 21.2, status: 'Prête' },
  { id: 'CMD-1041', customer: 'Thomas Bernard', phone: '06 23 45 67 89', products: 'Colis de bœuf', pickup: '2026-09-18', total: 68, status: 'En préparation' },
  { id: 'CMD-1040', customer: 'École des Tilleuls', phone: '06 34 56 78 90', products: 'Visite pédagogique - 24 personnes', pickup: '2026-09-22', total: 144, status: 'Nouvelle' },
  { id: 'CMD-1039', customer: 'Sophie Dubois', phone: '06 45 67 89 01', products: '2 boîtes d’œufs', pickup: '2026-09-11', total: 6.4, status: 'Retirée' }
];

let orders = [];
const tableBody = document.querySelector('#orders-table-body');
const emptyState = document.querySelector('#empty-orders');
const dialog = document.querySelector('#order-dialog');
const orderForm = document.querySelector('#order-form');

const formatDate = (date) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(`${date}T12:00:00`));
const formatMoney = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);

async function loadOrders() {
  const response = await fetch('../api/orders.php');
  if (!response.ok) throw new Error('Impossible de charger les commandes.');
  const data = await response.json();
  orders = data.orders || [];
}

function renderStats() {
  // Les indicateurs sont recalcules a partir de toutes les commandes.
  document.querySelector('#total-orders').textContent = orders.length;
  document.querySelector('#pending-orders').textContent = orders.filter((order) => order.status === 'Nouvelle' || order.status === 'En préparation').length;
  document.querySelector('#ready-orders').textContent = orders.filter((order) => order.status === 'Prête').length;
  document.querySelector('#total-revenue').textContent = formatMoney(orders.reduce((total, order) => total + Number(order.total), 0));
}

function renderOrders() {
  // Recherche et filtre avant de reconstruire les lignes du tableau.
  const search = document.querySelector('#order-search').value.toLowerCase();
  const status = document.querySelector('#status-filter').value;
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = `${order.id} ${order.customer} ${order.products}`.toLowerCase().includes(search);
    return matchesSearch && (status === 'all' || order.status === status);
  });

  tableBody.innerHTML = filteredOrders.map((order) => `<tr>
    <td><strong>${order.id}</strong><small>${order.phone}</small></td>
    <td>${order.customer}</td><td class="products-cell">${order.products}</td>
    <td>${formatDate(order.pickup)}</td><td><strong>${formatMoney(order.total)}</strong></td>
    <td><select class="status-select status-${order.status.replaceAll(' ', '-')}" data-id="${order.id}" aria-label="Statut de ${order.id}">${['Nouvelle', 'En préparation', 'Prête', 'Retirée'].map((value) => `<option ${value === order.status ? 'selected' : ''}>${value}</option>`).join('')}</select></td>
    <td><button class="delete-order" data-id="${order.id}" type="button" aria-label="Supprimer ${order.id}">×</button></td>
  </tr>`).join('');
  emptyState.hidden = filteredOrders.length > 0;
  renderStats();
}

document.querySelector('#new-order-button').addEventListener('click', () => dialog.showModal());
document.querySelectorAll('.close-dialog').forEach((button) => button.addEventListener('click', () => dialog.close()));
document.querySelector('#order-search').addEventListener('input', renderOrders);
document.querySelector('#status-filter').addEventListener('change', renderOrders);

tableBody.addEventListener('change', async (event) => {
  // Le statut modifie ici est immediatement repercute dans la base locale.
  if (!event.target.matches('.status-select')) return;
  const order = orders.find((item) => item.id === event.target.dataset.id);
  order.status = event.target.value;
  await fetch(`../api/orders.php?id=${encodeURIComponent(order.id)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: order.status }) });
  renderOrders();
});

tableBody.addEventListener('click', async (event) => {
  // Suppression volontaire d'une commande depuis le tableau.
  if (!event.target.matches('.delete-order')) return;
  orders = orders.filter((order) => order.id !== event.target.dataset.id);
  await fetch(`../api/orders.php?id=${encodeURIComponent(event.target.dataset.id)}`, { method: 'DELETE' });
  renderOrders();
});

orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  await fetch('../api/orders.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer: data.get('customer'), phone: data.get('phone'), products: data.get('products'), pickup: data.get('pickup'), total: Number(data.get('total')) }) });
  orderForm.reset();
  dialog.close();
  renderOrders();
});

loadOrders().then(renderOrders).catch(() => {
  orders = defaultOrders;
  renderOrders();
});

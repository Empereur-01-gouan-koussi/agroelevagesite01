const adminOrders = JSON.parse(localStorage.getItem('pres-vivants-orders') || '[]');
const money = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

const pending = adminOrders.filter((order) => order.status === 'Nouvelle' || order.status === 'En préparation').length;
const ready = adminOrders.filter((order) => order.status === 'Prête').length;
const revenue = adminOrders.reduce((total, order) => total + Number(order.total || 0), 0);
document.querySelector('#admin-total').textContent = adminOrders.length;
document.querySelector('#admin-pending').textContent = pending;
document.querySelector('#admin-ready').textContent = ready;
document.querySelector('#admin-revenue').textContent = money(revenue);

const recentOrders = document.querySelector('#admin-orders');
if (!adminOrders.length) {
  recentOrders.innerHTML = '<p class="empty-orders">Aucune commande enregistrée pour le moment.</p>';
} else {
  recentOrders.innerHTML = adminOrders.slice(0, 5).map((order) => `<article class="admin-order"><div><strong>${order.id} · ${order.customer}</strong><small>${order.products}</small></div><strong class="admin-order-price">${money(order.total)}</strong><span class="admin-status">${order.status}</span></article>`).join('');
}

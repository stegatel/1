// Admin Panel JavaScript
let products = [];
let orders = [];
let tasks = [];

// Check auth
if (localStorage.getItem('adminAuth') !== 'true' && !window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupNavigation();
    renderDashboard();
});

function loadData() {
    const storedProducts = localStorage.getItem('products');
    products = storedProducts ? JSON.parse(storedProducts) : [];

    const storedOrders = localStorage.getItem('orders');
    orders = storedOrders ? JSON.parse(orders) : [];

    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(`page-${page}`).classList.add('active');
            
            document.getElementById('pageTitle').textContent = item.textContent.trim();
            
            if (page === 'dashboard') renderDashboard();
            if (page === 'products') renderProductsTable();
            if (page === 'orders') renderOrdersTable();
            if (page === 'inventory') renderInventoryTable();
            if (page === 'analytics') renderAnalytics();
            if (page === 'planning') renderTasks();
        });
    });
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('show');
}

function logout() {
    localStorage.removeItem('adminAuth');
    window.location.href = 'login.html';
}

// Dashboard
function renderDashboard() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalOrders').textContent = orders.length;
    
    const revenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + parseFloat(o.total), 0);
    document.getElementById('totalRevenue').textContent = revenue.toLocaleString() + ' грн';
    
    const lowStock = products.filter(p => p.stock <= 5).length;
    document.getElementById('lowStock').textContent = lowStock;
    
    // Recent orders
    const recentOrders = orders.slice(-5).reverse();
    document.getElementById('recentOrdersBody').innerHTML = recentOrders.map(o => `
        <tr>
            <td>#${o.id.toString().slice(-6)}</td>
            <td>${new Date(o.date).toLocaleDateString()}</td>
            <td>${o.customer.name}</td>
            <td>${o.total} грн</td>
            <td><span class="status-badge status-${o.status}">${getStatusText(o.status)}</span></td>
        </tr>
    `).join('') || '<tr><td colspan="5" style="text-align:center;">Немає замовлень</td></tr>';
    
    // Charts
    renderSalesChart();
    renderCategoryChart();
}

function renderSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
    }
    
    const salesData = last7Days.map(date => {
        return orders.filter(o => o.date.startsWith(date) && o.status !== 'cancelled')
            .reduce((sum, o) => sum + parseFloat(o.total), 0);
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.map(d => d.slice(5)),
            datasets: [{
                label: 'Продажі (грн)',
                data: salesData,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const categories = {};
    products.forEach(p => {
        categories[p.category] = (categories[p.category] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories).map(c => getCategoryName(c)),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']
            }]
        },
        options: { responsive: true }
    });
}

// Products
function renderProductsTable() {
    const search = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.sku.toLowerCase().includes(search) ||
        p.barcode.includes(search)
    );
    
    document.getElementById('productsTableBody').innerHTML = filtered.map(p => `
        <tr>
            <td>${p.id}</td>
            <td><img src="${p.image}" class="product-thumb" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${p.sku}</td>
            <td>${p.barcode}</td>
            <td>${getCategoryName(p.category)}</td>
            <td>${p.price} грн</td>
            <td class="${p.stock <= 5 ? 'stock-low' : 'stock-ok'}">${p.stock}</td>
            <td class="action-btns">
                <button class="action-btn edit" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="9" style="text-align:center;">Немає товарів</td></tr>';
}

function showProductModal(id = null) {
    document.getElementById('productModal').style.display = 'block';
    
    if (id) {
        const p = products.find(prod => prod.id === id);
        document.getElementById('productModalTitle').textContent = 'Редагувати товар';
        document.getElementById('prodId').value = p.id;
        document.getElementById('prodName').value = p.name;
        document.getElementById('prodCategory').value = p.category;
        document.getElementById('prodSku').value = p.sku;
        document.getElementById('prodBarcode').value = p.barcode;
        document.getElementById('prodImage').value = p.image;
        document.getElementById('prodPrice').value = p.price;
        document.getElementById('prodOldPrice').value = p.oldPrice || '';
        document.getElementById('prodStock').value = p.stock;
        document.getElementById('prodRating').value = p.rating;
        document.getElementById('prodBadge').value = p.badge || '';
    } else {
        document.getElementById('productModalTitle').textContent = 'Новий товар';
        document.getElementById('productForm').reset();
        document.getElementById('prodId').value = '';
    }
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

function saveProduct(e) {
    e.preventDefault();
    
    const id = document.getElementById('prodId').value;
    const product = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('prodName').value,
        category: document.getElementById('prodCategory').value,
        sku: document.getElementById('prodSku').value,
        barcode: document.getElementById('prodBarcode').value,
        image: document.getElementById('prodImage').value || 'https://via.placeholder.com/400',
        price: parseFloat(document.getElementById('prodPrice').value),
        oldPrice: document.getElementById('prodOldPrice').value ? parseFloat(document.getElementById('prodOldPrice').value) : null,
        stock: parseInt(document.getElementById('prodStock').value),
        rating: parseFloat(document.getElementById('prodRating').value),
        badge: document.getElementById('prodBadge').value
    };
    
    if (id) {
        const index = products.findIndex(p => p.id == id);
        products[index] = product;
    } else {
        products.push(product);
    }
    
    saveData();
    closeProductModal();
    renderProductsTable();
    
    // Update main site
    localStorage.setItem('products', JSON.stringify(products));
}

function editProduct(id) {
    showProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Видалити цей товар?')) {
        products = products.filter(p => p.id !== id);
        saveData();
        renderProductsTable();
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Orders
function renderOrdersTable() {
    const filter = document.getElementById('orderFilter')?.value || 'all';
    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    
    document.getElementById('ordersTableBody').innerHTML = filtered.reverse().map(o => `
        <tr>
            <td>#${o.id.toString().slice(-6)}</td>
            <td>${new Date(o.date).toLocaleDateString()}</td>
            <td>${o.customer.name}</td>
            <td>${o.customer.phone}</td>
            <td>${o.delivery.city}</td>
            <td>${o.total} грн</td>
            <td><span class="status-badge status-${o.status}">${getStatusText(o.status)}</span></td>
            <td class="action-btns">
                <button class="action-btn view" onclick="viewOrder(${o.id})"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="8" style="text-align:center;">Немає замовлень</td></tr>';
}

function viewOrder(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderDetails').innerHTML = `
        <div style="margin-bottom:20px;">
            <strong>Клієнт:</strong> ${order.customer.name}<br>
            <strong>Телефон:</strong> ${order.customer.phone}<br>
            <strong>Email:</strong> ${order.customer.email || '-'}<br>
            <strong>Доставка:</strong> ${order.delivery.city}, відділення №${order.delivery.branch}<br>
            <strong>Оплата:</strong> ${order.payment === 'card' ? 'Карткою' : 'При отриманні'}
        </div>
        <table class="data-table" style="margin-bottom:20px;">
            <thead><tr><th>Товар</th><th>К-сть</th><th>Ціна</th><th>Сума</th></tr></thead>
            <tbody>
                ${order.items.map(i => `
                    <tr>
                        <td>${i.name}</td>
                        <td>${i.qty}</td>
                        <td>${i.price} грн</td>
                        <td>${i.price * i.qty} грн</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div style="font-size:18px;font-weight:bold;">Разом: ${order.total} грн</div>
        <div style="margin-top:20px;">
            <strong>Статус:</strong>
            <select onchange="updateOrderStatus(${order.id}, this.value)" style="padding:8px;margin-left:10px;">
                <option value="new" ${order.status === 'new' ? 'selected' : ''}>Нове</option>
                <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>В обробці</option>
                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Відправлено</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Доставлено</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Скасовано</option>
            </select>
        </div>
    `;
    document.getElementById('orderModal').style.display = 'block';
}

function updateOrderStatus(id, status) {
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        saveData();
        renderOrdersTable();
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Inventory
function renderInventoryTable() {
    document.getElementById('inventoryTableBody').innerHTML = products.map(p => `
        <tr>
            <td>${p.sku}</td>
            <td>${p.name}</td>
            <td class="${p.stock <= 5 ? 'stock-low' : 'stock-ok'}">${p.stock}</td>
            <td>
                ${p.stock === 0 ? '<span class="status-badge status-cancelled">Немає</span>' : 
                  p.stock <= 5 ? '<span class="status-badge status-processing">Мало</span>' : 
                  '<span class="status-badge status-delivered">OK</span>'}
            </td>
            <td>-</td>
        </tr>
    `).join('') || '<tr><td colspan="5" style="text-align:center;">Немає товарів</td></tr>';
}

function showReceiveModal() {
    document.getElementById('receiveModal').style.display = 'block';
}

function receiveProduct(e) {
    e.preventDefault();
    const code = document.getElementById('receiveCode').value;
    const qty = parseInt(document.getElementById('receiveQty').value);
    
    const product = products.find(p => p.sku === code || p.barcode === code);
    if (product) {
        product.stock += qty;
        saveData();
        renderInventoryTable();
        localStorage.setItem('products', JSON.stringify(products));
        document.getElementById('receiveModal').style.display = 'none';
        alert(`Прийнято ${qty} шт. товару ${product.name}`);
    } else {
        alert('Товар не знайдено!');
    }
}

function showInventoryModal() {
    const select = document.getElementById('inventoryProduct');
    select.innerHTML = products.map(p => `<option value="${p.id}">${p.sku} - ${p.name} (${p.stock} шт)</option>`).join('');
    document.getElementById('inventoryModal').style.display = 'block';
}

function updateInventory(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('inventoryProduct').value);
    const count = parseInt(document.getElementById('inventoryCount').value);
    
    const product = products.find(p => p.id === id);
    if (product) {
        product.stock = count;
        saveData();
        renderInventoryTable();
        localStorage.setItem('products', JSON.stringify(products));
        document.getElementById('inventoryModal').style.display = 'none';
        alert('Залишки оновлено!');
    }
}

// Analytics
function renderAnalytics() {
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) return;
    
    const monthlySales = {};
    orders.filter(o => o.status !== 'cancelled').forEach(o => {
        const month = o.date.slice(0, 7);
        monthlySales[month] = (monthlySales[month] || 0) + parseFloat(o.total);
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(monthlySales),
            datasets: [{
                label: 'Продажі (грн)',
                data: Object.values(monthlySales),
                backgroundColor: '#2563eb'
            }]
        },
        options: { responsive: true }
    });
    
    // Stats
    const avgOrder = orders.length > 0 
        ? orders.reduce((sum, o) => sum + parseFloat(o.total), 0) / orders.length 
        : 0;
    document.getElementById('avgOrder').textContent = avgOrder.toFixed(0) + ' грн';
    
    // Top product
    const productSales = {};
    orders.forEach(o => {
        o.items.forEach(i => {
            productSales[i.name] = (productSales[i.name] || 0) + i.qty;
        });
    });
    const topProduct = Object.entries(productSales).sort((a,b) => b[1] - a[1])[0];
    document.getElementById('topProduct').textContent = topProduct ? topProduct[0] : '-';
    
    document.getElementById('conversionRate').textContent = '2.5%';
}

// Reports
function generateReport() {
    const type = document.getElementById('reportType').value;
    const output = document.getElementById('reportOutput');
    
    let content = '';
    
    if (type === 'sales') {
        const total = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + parseFloat(o.total), 0);
        content = `
            <h3>Звіт з продажів</h3>
            <p>Загальна кількість замовлень: ${orders.length}</p>
            <p>Загальна сума: ${total.toLocaleString()} грн</p>
            <p>Середній чек: ${(total / orders.length || 0).toFixed(0)} грн</p>
        `;
    } else if (type === 'stock') {
        const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
        const lowStock = products.filter(p => p.stock <= 5).length;
        content = `
            <h3>Звіт по залишках</h3>
            <p>Загальна кількість товарів: ${products.length}</p>
            <p>Загальний залишок: ${totalStock} шт</p>
            <p>Товарів з малою кількістю: ${lowStock}</p>
        `;
    } else if (type === 'profit') {
        const revenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + parseFloat(o.total), 0);
        const profit = revenue * 0.3; // Approximate 30% margin
        content = `
            <h3>Звіт по прибутку</h3>
            <p>Виручка: ${revenue.toLocaleString()} грн</p>
            <p>Орієнтовний прибуток (30%): ${profit.toLocaleString()} грн</p>
        `;
    } else if (type === 'customers') {
        const customers = {};
        orders.forEach(o => {
            customers[o.customer.name] = (customers[o.customer.name] || 0) + 1;
        });
        content = `
            <h3>Звіт по клієнтах</h3>
            <p>Усього клієнтів: ${Object.keys(customers).length}</p>
            <ul>${Object.entries(customers).map(([name, count]) => `<li>${name}: ${count} замовлень</li>`).join('')}</ul>
        `;
    }
    
    output.innerHTML = content;
}

// Planning (Tasks)
function renderTasks() {
    document.getElementById('todoTasks').innerHTML = tasks.filter(t => t.status === 'todo')
        .map(t => `<div class="task-card">${t.desc}</div>`).join('') || '<p>Немає завдань</p>';
    
    document.getElementById('inProgressTasks').innerHTML = tasks.filter(t => t.status === 'inprogress')
        .map(t => `<div class="task-card">${t.desc}</div>`).join('') || '<p>Немає завдань</p>';
    
    document.getElementById('doneTasks').innerHTML = tasks.filter(t => t.status === 'done')
        .map(t => `<div class="task-card" style="opacity:0.6;text-decoration:line-through;">${t.desc}</div>`).join('') || '<p>Немає завдань</p>';
}

function addTask() {
    document.getElementById('taskModal').style.display = 'block';
}

function saveTask(e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        desc: document.getElementById('taskDesc').value,
        status: document.getElementById('taskStatus').value
    };
    tasks.push(task);
    saveData();
    document.getElementById('taskModal').style.display = 'none';
    renderTasks();
}

// Helpers
function getStatusText(status) {
    const texts = { new: 'Нове', processing: 'В обробці', shipped: 'Відправлено', delivered: 'Доставлено', cancelled: 'Скасовано' };
    return texts[status] || status;
}

function getCategoryName(cat) {
    const names = { cases: 'Чохли', chargers: 'Зарядні', cables: 'Кабелі', audio: 'Навушники', protection: 'Захист', holders: 'Тримачі', powerbank: 'PowerBank' };
    return names[cat] || cat;
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

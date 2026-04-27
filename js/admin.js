// Admin Panel JavaScript

// Sample data (in production, this would come from a backend)
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Чохол Silicone Case для iPhone 14 Pro", category: "cases", price: 350, stock: 25, sku: "CS-IP14P-001", barcode: "4820001234567", image: "https://images.unsplash.com/photo-1603351154351-5cf99bc75667?w=300&h=300&fit=crop" },
    { id: 2, name: "Зарядний пристрій USB-C 20W", category: "chargers", price: 450, stock: 18, sku: "CH-USBC-020", barcode: "4820001234568", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop" },
    { id: 3, name: "Кабель Lightning 1m", category: "cables", price: 250, stock: 50, sku: "CB-LIGHT-001", barcode: "4820001234569", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=300&fit=crop" },
    { id: 4, name: "Навушники AirPods Pro 2", category: "audio", price: 8500, stock: 5, sku: "AU-AIRPODS-PRO2", barcode: "4820001234570", image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop" },
    { id: 5, name: "Захисне скло Tempered Glass iPhone 14", category: "protective", price: 150, stock: 100, sku: "PR-GLASS-IP14", barcode: "4820001234571", image: "https://images.unsplash.com/photo-1592899677712-a5a254503481?w=300&h=300&fit=crop" },
    { id: 6, name: "Тримач автомобільний магнітний", category: "holders", price: 280, stock: 15, sku: "HL-MAG-001", barcode: "4820001234572", image: "https://images.unsplash.com/photo-1517663291528-b0b5985500b5?w=300&h=300&fit=crop" }
];

let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentOrder = null;
let charts = {};

// Login Page
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Невірний логін або пароль!');
    }
}

// Check authentication on dashboard
if (window.location.pathname.includes('dashboard.html')) {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// Dashboard Navigation
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('dashboard.html')) {
        setupNavigation();
        loadDashboard();
    }
});

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            const page = item.dataset.page;
            showPage(page);
        });
    });
}

function showPage(pageName) {
    document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageName}Page`).classList.add('active');
    
    const titles = {
        dashboard: 'Дашборд',
        products: 'Управління товарами',
        categories: 'Категорії',
        orders: 'Замовлення',
        analytics: 'Аналітика',
        reports: 'Звіти',
        inventory: 'Інвентаризація',
        suppliers: 'Постачальники',
        planning: 'Планування'
    };
    
    document.getElementById('pageTitle').textContent = titles[pageName] || pageName;
    
    // Load page-specific data
    switch(pageName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProductsTable();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'inventory':
            loadInventoryTable();
            break;
        case 'planning':
            loadCalendar();
            break;
    }
}

// Dashboard Functions
function loadDashboard() {
    // Update stats
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalOrders').textContent = orders.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = `${totalRevenue.toLocaleString()} грн`;
    
    const lowStock = products.filter(p => p.stock < 10).length;
    document.getElementById('lowStock').textContent = lowStock;
    
    // Load recent orders
    loadRecentOrders();
    
    // Initialize charts
    setTimeout(() => {
        initSalesChart();
        initCategoryChart();
    }, 100);
}

function loadRecentOrders() {
    const recentOrders = orders.slice(-5).reverse();
    const tbody = document.getElementById('recentOrders');
    
    tbody.innerHTML = recentOrders.map(order => `
        <tr>
            <td>#${order.id.toString().slice(-6)}</td>
            <td>${new Date(order.date).toLocaleDateString('uk-UA')}</td>
            <td>${order.customer.name}</td>
            <td>${order.total.toLocaleString()} грн</td>
            <td><span class="status-badge status-${order.status || 'new'}">${getStatusText(order.status || 'new')}</span></td>
        </tr>
    `).join('');
    
    if (recentOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Замовлень ще немає</td></tr>';
    }
}

function getStatusText(status) {
    const texts = {
        new: 'Нове',
        processing: 'В обробці',
        shipped: 'Відправлено',
        completed: 'Завершено',
        cancelled: 'Скасовано'
    };
    return texts[status] || status;
}

function initSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    if (charts.sales) {
        charts.sales.destroy();
    }
    
    const salesData = generateSalesData();
    
    charts.sales = new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.labels,
            datasets: [{
                label: 'Продажі (грн)',
                data: salesData.values,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (charts.category) {
        charts.category.destroy();
    }
    
    const categoryData = getCategoryData();
    
    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.values,
                backgroundColor: [
                    '#667eea',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#06b6d4'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function generateSalesData() {
    const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    const values = orders.map(() => Math.floor(Math.random() * 5000) + 1000);
    
    // Ensure we have 7 days of data
    while (values.length < 7) {
        values.push(Math.floor(Math.random() * 5000) + 1000);
    }
    
    return { labels, values: values.slice(0, 7) };
}

function getCategoryData() {
    const categories = {};
    
    products.forEach(product => {
        categories[product.category] = (categories[product.category] || 0) + 1;
    });
    
    const categoryNames = {
        cases: 'Чохли',
        chargers: 'Зарядні',
        cables: 'Кабелі',
        audio: 'Навушники',
        protective: 'Захист',
        holders: 'Тримачі'
    };
    
    return {
        labels: Object.keys(categories).map(c => categoryNames[c] || c),
        values: Object.values(categories)
    };
}

// Products Management
function loadProductsTable() {
    const tbody = document.getElementById('productsTable');
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.barcode}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>${product.price.toLocaleString()} грн</td>
            <td>${product.stock} шт.</td>
            <td class="table-actions">
                <button class="btn-sm btn-edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-sm btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        cases: 'Чохли',
        chargers: 'Зарядні пристрої',
        cables: 'Кабелі',
        audio: 'Навушники',
        protective: 'Захисне скло',
        holders: 'Тримачі'
    };
    return names[category] || category;
}

function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        document.getElementById('productModalTitle').textContent = 'Редагувати товар';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productSku').value = product.sku;
        document.getElementById('productBarcode').value = product.barcode;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productImage').value = product.image;
    } else {
        document.getElementById('productModalTitle').textContent = 'Додати товар';
        form.reset();
        document.getElementById('productId').value = '';
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function saveProduct(event) {
    event.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const productData = {
        id: productId ? parseInt(productId) : Date.now(),
        name: document.getElementById('productName').value,
        sku: document.getElementById('productSku').value,
        barcode: document.getElementById('productBarcode').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        image: document.getElementById('productImage').value || 'https://via.placeholder.com/300'
    };
    
    if (productId) {
        const index = products.findIndex(p => p.id === parseInt(productId));
        products[index] = productData;
    } else {
        products.push(productData);
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    closeProductModal();
    loadProductsTable();
    showNotification('Товар збережено');
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        loadProductsTable();
        showNotification('Товар видалено');
    }
}

function searchProductsAdmin(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase()) ||
        p.barcode.includes(query)
    );
    
    const tbody = document.getElementById('productsTable');
    tbody.innerHTML = filtered.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.barcode}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>${product.price.toLocaleString()} грн</td>
            <td>${product.stock} шт.</td>
            <td class="table-actions">
                <button class="btn-sm btn-edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-sm btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Orders Management
function loadOrdersTable() {
    const tbody = document.getElementById('ordersTable');
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id.toString().slice(-6)}</td>
            <td>${new Date(order.date).toLocaleDateString('uk-UA')}</td>
            <td>${order.customer.name}</td>
            <td>${order.customer.phone}</td>
            <td>${order.customer.city}</td>
            <td>${order.items.length} тов.</td>
            <td>${order.total.toLocaleString()} грн</td>
            <td>${getPaymentText(order.customer.payment)}</td>
            <td><span class="status-badge status-${order.status || 'new'}">${getStatusText(order.status || 'new')}</span></td>
            <td class="table-actions">
                <button class="btn-sm btn-view" onclick="viewOrder(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">Замовлень ще немає</td></tr>';
    }
}

function getPaymentText(payment) {
    const texts = {
        card: 'Карта',
        cash: 'Готівка',
        privat24: 'Privat24'
    };
    return texts[payment] || payment;
}

function filterOrders(status) {
    const tbody = document.getElementById('ordersTable');
    const filtered = status === 'all' ? orders : orders.filter(o => o.status === status);
    
    tbody.innerHTML = filtered.map(order => `
        <tr>
            <td>#${order.id.toString().slice(-6)}</td>
            <td>${new Date(order.date).toLocaleDateString('uk-UA')}</td>
            <td>${order.customer.name}</td>
            <td>${order.customer.phone}</td>
            <td>${order.customer.city}</td>
            <td>${order.items.length} тов.</td>
            <td>${order.total.toLocaleString()} грн</td>
            <td>${getPaymentText(order.customer.payment)}</td>
            <td><span class="status-badge status-${order.status || 'new'}">${getStatusText(order.status || 'new')}</span></td>
            <td class="table-actions">
                <button class="btn-sm btn-view" onclick="viewOrder(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    currentOrder = order;
    
    document.getElementById('orderNumber').textContent = order.id.toString().slice(-6);
    document.getElementById('orderStatus').value = order.status || 'new';
    
    const detailsHtml = `
        <div class="order-info">
            <div>
                <strong>Клієнт:</strong><br>
                ${order.customer.name}<br>
                ${order.customer.phone}<br>
                ${order.customer.email}
            </div>
            <div>
                <strong>Доставка:</strong><br>
                м. ${order.customer.city}<br>
                Відділення: ${order.customer.department}<br>
                Оплата: ${getPaymentText(order.customer.payment)}
            </div>
        </div>
        <h4>Товари в замовленні:</h4>
        ${order.items.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.quantity} шт. × ${item.price.toLocaleString()} грн = ${(item.quantity * item.price).toLocaleString()} грн
                </div>
            </div>
        `).join('')}
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: right;">
            <strong style="font-size: 20px;">Разом: ${order.total.toLocaleString()} грн</strong>
        </div>
    `;
    
    document.getElementById('orderDetails').innerHTML = detailsHtml;
    document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

function updateOrderStatus() {
    if (currentOrder) {
        const newStatus = document.getElementById('orderStatus').value;
        const orderIndex = orders.findIndex(o => o.id === currentOrder.id);
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        closeOrderModal();
        loadOrdersTable();
        showNotification('Статус оновлено');
    }
}

// Inventory Management
function loadInventoryTable() {
    const tbody = document.getElementById('inventoryTable');
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td><input type="number" value="${product.stock}" style="width: 80px; padding: 5px;" id="actual-${product.id}"></td>
            <td>${product.stock}</td>
            <td id="diff-${product.id}">0</td>
            <td>
                <button class="btn-sm btn-edit" onclick="updateInventory(${product.id})">
                    <i class="fas fa-check"></i> Оновити
                </button>
            </td>
        </tr>
    `).join('');
}

function updateInventory(productId) {
    const actual = parseInt(document.getElementById(`actual-${productId}`).value);
    const product = products.find(p => p.id === productId);
    const diff = actual - product.stock;
    
    document.getElementById(`diff-${productId}`).textContent = diff > 0 ? `+${diff}` : diff;
    
    if (confirm(`Оновити залишок для "${product.name}" з ${product.stock} до ${actual}?`)) {
        product.stock = actual;
        localStorage.setItem('products', JSON.stringify(products));
        showNotification('Залишок оновлено');
        loadInventoryTable();
    }
}

function openInventoryModal() {
    const select = document.getElementById('inventoryProduct');
    select.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (${p.sku})</option>`).join('');
    document.getElementById('inventoryModal').classList.add('active');
}

function closeInventoryModal() {
    document.getElementById('inventoryModal').classList.remove('active');
}

function saveInventory(event) {
    event.preventDefault();
    
    const productId = parseInt(document.getElementById('inventoryProduct').value);
    const quantity = parseInt(document.getElementById('inventoryQuantity').value);
    const supplier = document.getElementById('inventorySupplier').value;
    const cost = parseFloat(document.getElementById('inventoryCost').value) || 0;
    
    const product = products.find(p => p.id === productId);
    product.stock += quantity;
    
    localStorage.setItem('products', JSON.stringify(products));
    closeInventoryModal();
    loadInventoryTable();
    showNotification(`Прийнято ${quantity} шт. "${product.name}"`);
}

function startInventory() {
    showNotification('Переучет розпочато. Введіть фактичні залишки та натисніть "Оновити"');
}

// Analytics
function loadAnalytics() {
    updateAnalytics();
}

function updateAnalytics() {
    const period = document.getElementById('analyticsPeriod').value;
    
    // Calculate metrics
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    
    document.getElementById('avgOrderValue').textContent = `${Math.round(avgOrderValue).toLocaleString()} грн`;
    document.getElementById('conversionRate').textContent = `${Math.min(orders.length * 2, 95).toFixed(1)}%`;
    
    // Find top category
    const categorySales = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            categorySales[item.category] = (categorySales[item.category] || 0) + item.price * item.quantity;
        });
    });
    
    const topCategory = Object.entries(categorySales).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('topCategory').textContent = topCategory ? getCategoryName(topCategory[0]) : '-';
    
    // Update chart
    setTimeout(() => {
        initAnalyticsChart(period);
    }, 100);
}

function initAnalyticsChart(period) {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    
    if (charts.analytics) {
        charts.analytics.destroy();
    }
    
    const data = generateAnalyticsData(period);
    
    charts.analytics = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Продажі (грн)',
                data: data.values,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generateAnalyticsData(period) {
    let labels = [];
    let values = [];
    
    switch(period) {
        case 'week':
            labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
            values = Array.from({length: 7}, () => Math.floor(Math.random() * 10000) + 2000);
            break;
        case 'month':
            labels = Array.from({length: 30}, (_, i) => `${i + 1}`);
            values = Array.from({length: 30}, () => Math.floor(Math.random() * 15000) + 3000);
            break;
        case 'year':
            labels = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
            values = Array.from({length: 12}, () => Math.floor(Math.random() * 100000) + 50000);
            break;
    }
    
    return { labels, values };
}

// Reports
function generateReport(type) {
    const reportTypes = {
        sales: 'Звіт по продажах',
        inventory: 'Звіт по залишках',
        profit: 'Звіт по прибутку',
        customers: 'Звіт по клієнтах'
    };
    
    alert(`Генерація звіту: ${reportTypes[type]}\n\nЗвіт буде сформовано та завантажено у форматі PDF.`);
}

// Calendar & Planning
let currentDate = new Date();

function loadCalendar() {
    renderCalendar();
    loadEvents();
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthNames = ['Січень', 'Лютий', 'Бережень', 'Квітень', 'Травень', 'Червень', 
                       'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    const grid = document.getElementById('calendarGrid');
    let html = '';
    
    // Day headers
    ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].forEach(day => {
        html += `<div class="calendar-day header">${day}</div>`;
    });
    
    // Empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="calendar-day"></div>`;
    }
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        html += `<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`;
    }
    
    grid.innerHTML = html;
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventsList = document.getElementById('eventsList');
    
    eventsList.innerHTML = events.map(event => `
        <div class="event-item">
            <strong>${event.title}</strong><br>
            <small>${new Date(event.date).toLocaleDateString('uk-UA')}</small>
        </div>
    `).join('');
    
    if (events.length === 0) {
        eventsList.innerHTML = '<p style="color: #64748b;">Подій ще немає</p>';
    }
}

function addEvent() {
    const title = prompt('Назва події:');
    if (!title) return;
    
    const date = prompt('Дата (РРРР-ММ-ДД):');
    if (!date) return;
    
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push({ title, date, id: Date.now() });
    localStorage.setItem('events', JSON.stringify(events));
    
    loadEvents();
    renderCalendar();
    showNotification('Подію додано');
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 4000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

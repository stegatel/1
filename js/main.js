// Sample Products Data
const products = [
    {
        id: 1,
        name: "Чохол Silicone Case для iPhone 14 Pro",
        category: "cases",
        price: 350,
        stock: 25,
        sku: "CS-IP14P-001",
        barcode: "4820001234567",
        image: "https://images.unsplash.com/photo-1603351154351-5cf99bc75667?w=300&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Зарядний пристрій USB-C 20W",
        category: "chargers",
        price: 450,
        stock: 18,
        sku: "CH-USBC-020",
        barcode: "4820001234568",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Кабель Lightning 1m",
        category: "cables",
        price: 250,
        stock: 50,
        sku: "CB-LIGHT-001",
        barcode: "4820001234569",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Навушники AirPods Pro 2",
        category: "audio",
        price: 8500,
        stock: 5,
        sku: "AU-AIRPODS-PRO2",
        barcode: "4820001234570",
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Захисне скло Tempered Glass iPhone 14",
        category: "protective",
        price: 150,
        stock: 100,
        sku: "PR-GLASS-IP14",
        barcode: "4820001234571",
        image: "https://images.unsplash.com/photo-1592899677712-a5a254503481?w=300&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Тримач автомобільний магнітний",
        category: "holders",
        price: 280,
        stock: 15,
        sku: "HL-MAG-001",
        barcode: "4820001234572",
        image: "https://images.unsplash.com/photo-1517663291528-b0b5985500b5?w=300&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Чохол Leather Case Samsung S23",
        category: "cases",
        price: 420,
        stock: 12,
        sku: "CS-SAM-S23",
        barcode: "4820001234573",
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=300&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Power Bank 10000mAh",
        category: "chargers",
        price: 650,
        stock: 30,
        sku: "CH-PB-10K",
        barcode: "4820001234574",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Кабель USB-C to USB-C 2m",
        category: "cables",
        price: 320,
        stock: 40,
        sku: "CB-USBC-002",
        barcode: "4820001234575",
        image: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=300&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Навушники Sony WH-1000XM5",
        category: "audio",
        price: 12500,
        stock: 3,
        sku: "AU-SONY-XM5",
        barcode: "4820001234576",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Wireless Charger 15W",
        category: "chargers",
        price: 550,
        stock: 22,
        sku: "CH-WL-15W",
        barcode: "4820001234577",
        image: "https://images.unsplash.com/photo-1586953229671-e29ce8f86a88?w=300&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Чохол Clear Case Xiaomi 13",
        category: "cases",
        price: 180,
        stock: 35,
        sku: "CS-XIA-13",
        barcode: "4820001234578",
        image: "https://images.unsplash.com/photo-1585298723682-711ba798a5fd?w=300&h=300&fit=crop"
    }
];

// Cart State
let cart = [];
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupNavigation();
    loadCart();
});

// Load Products
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    const filtered = filterProductsData();
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()} грн</div>
                <div class="product-stock ${getStockClass(product.stock)}">
                    ${getStockText(product.stock)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus"></i> Додати до кошика
                </button>
            </div>
        </div>
    `).join('');
}

function filterProductsData() {
    let filtered = [...products];
    
    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Price filter
    const priceFilter = document.getElementById('priceFilter').value;
    if (priceFilter !== 'all') {
        if (priceFilter.includes('+')) {
            const min = parseInt(priceFilter);
            filtered = filtered.filter(p => p.price >= min);
        } else {
            const [min, max] = priceFilter.split('-').map(Number);
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }
    }
    
    // Sort
    const sortType = document.getElementById('sortFilter').value;
    switch(sortType) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
            break;
    }
    
    return filtered;
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

function getStockClass(stock) {
    if (stock === 0) return 'out';
    if (stock < 10) return 'low';
    return '';
}

function getStockText(stock) {
    if (stock === 0) return 'Немає в наявності';
    if (stock < 10) return `Закінчується: ${stock} шт.`;
    return `В наявності: ${stock} шт.`;
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentCategory = link.dataset.category;
            loadProducts();
        });
    });
}

// Filter Products
function filterProducts() {
    loadProducts();
}

// Search Products
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('productsGrid');
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.barcode.includes(query)
    );
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()} грн</div>
                <div class="product-stock ${getStockClass(product.stock)}">
                    ${getStockText(product.stock)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus"></i> Додати до кошика
                </button>
            </div>
        </div>
    `).join('');
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Максимальна кількість товару в кошику');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Товар додано до кошика');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function openCart() {
    const modal = document.getElementById('cartModal');
    const itemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">Кошик порожній</p>';
    } else {
        itemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} грн</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cartTotal').textContent = `${total.toLocaleString()} грн`;
    
    modal.classList.add('active');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else if (item.quantity > product.stock) {
            item.quantity = product.stock;
            alert('Максимальна кількість товару');
        }
        saveCart();
        openCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    openCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) {
        alert('Кошик порожній');
        return;
    }
    closeCart();
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function submitOrder(event) {
    event.preventDefault();
    
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        customer: {
            name: event.target[0].value,
            phone: event.target[1].value,
            email: event.target[2].value,
            city: event.target[3].value,
            department: event.target[4].value,
            payment: event.target[5].value
        }
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Update product stock
    order.items.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    localStorage.setItem('products', JSON.stringify(products));
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    closeCheckout();
    
    alert(`Замовлення №${order.id} успішно оформлено! Менеджер зв'яжеться з вами найближчим часом.`);
    event.target.reset();
}

// LocalStorage Functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartCount();
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
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// TechAccessory - Main JavaScript

// ==================== DATA ====================
const defaultProducts = [
    {
        id: 1,
        name: "Чохол Silicone Case для iPhone 15 Pro Max",
        category: "cases",
        price: 899,
        oldPrice: 1199,
        sku: "CS-IP15PM-001",
        barcode: "4820001234567",
        stock: 45,
        rating: 4.8,
        reviews: 124,
        image: "https://via.placeholder.com/400x400/2563eb/ffffff?text=Чохол+iPhone",
        badges: ["new", "hit"],
        description: "Премиальний силіконовий чохол з мікрофіброю"
    },
    {
        id: 2,
        name: "Зарядний пристрій USB-C 20W Fast Charge",
        category: "chargers",
        price: 599,
        oldPrice: null,
        sku: "CH-USBC-20W-002",
        barcode: "4820001234568",
        stock: 120,
        rating: 4.9,
        reviews: 89,
        image: "https://via.placeholder.com/400x400/10b981/ffffff?text=Зарядка+20W",
        badges: ["hit"],
        description: "Швидка зарядка з підтримкою Power Delivery"
    },
    {
        id: 3,
        name: "Кабель USB-C to Lightning 1.5м Braided",
        category: "cables",
        price: 399,
        oldPrice: 499,
        sku: "CB-LC-USBC-003",
        barcode: "4820001234569",
        stock: 200,
        rating: 4.7,
        reviews: 256,
        image: "https://via.placeholder.com/400x400/f59e0b/ffffff?text=Кабель+Lightning",
        badges: ["sale"],
        description: "Міцний плетений кабель з армованими конекторами"
    },
    {
        id: 4,
        name: "Навушники AirPods Pro 2 з MagSafe",
        category: "audio",
        price: 8999,
        oldPrice: 10999,
        sku: "AU-AIRPODS-PRO2-004",
        barcode: "4820001234570",
        stock: 15,
        rating: 5.0,
        reviews: 342,
        image: "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=AirPods+Pro+2",
        badges: ["hit", "sale"],
        description: "Флагманські навушники з активним шумопоглинанням"
    },
    {
        id: 5,
        name: "Захисне скло 3D Full Glue для Samsung S24 Ultra",
        category: "protection",
        price: 449,
        oldPrice: null,
        sku: "PR-SG-S24U-005",
        barcode: "4820001234571",
        stock: 85,
        rating: 4.6,
        reviews: 78,
        image: "https://via.placeholder.com/400x400/ec4899/ffffff?text=Скло+Samsung",
        badges: ["new"],
        description: "Повне покриття з чорною рамкою"
    },
    {
        id: 6,
        name: "Автомобільний тримач MagSafe Vent Mount",
        category: "holders",
        price: 1299,
        oldPrice: null,
        sku: "HL-MAG-VNT-006",
        barcode: "4820001234572",
        stock: 35,
        rating: 4.8,
        reviews: 56,
        image: "https://via.placeholder.com/400x400/06b6d4/ffffff?text=Тримач+MagSafe",
        badges: [],
        description: "Магнітний тримач у вентиляційну решітку"
    },
    {
        id: 7,
        name: "PowerBank 20000mAh 65W PD Fast Charge",
        category: "powerbank",
        price: 2499,
        oldPrice: 2999,
        sku: "PB-20K-65W-007",
        barcode: "4820001234573",
        stock: 28,
        rating: 4.9,
        reviews: 167,
        image: "https://via.placeholder.com/400x400/f97316/ffffff?text=PowerBank+20K",
        badges: ["hit"],
        description: "Потужний пауербанк з дисплеєм"
    },
    {
        id: 8,
        name: "Чохол Leather Case для Samsung Galaxy S24",
        category: "cases",
        price: 1199,
        oldPrice: null,
        sku: "CS-SAM-S24-008",
        barcode: "4820001234574",
        stock: 22,
        rating: 4.7,
        reviews: 43,
        image: "https://via.placeholder.com/400x400/84cc16/ffffff?text=Чохол+Samsung",
        badges: ["new"],
        description: "Натуральна шкіра преміум якості"
    },
    {
        id: 9,
        name: "Бездротова зарядка 15W MagSafe Compatible",
        category: "chargers",
        price: 899,
        oldPrice: 1099,
        sku: "CH-WRL-MAG-009",
        barcode: "4820001234575",
        stock: 67,
        rating: 4.5,
        reviews: 92,
        image: "https://via.placeholder.com/400x400/14b8a6/ffffff?text=Бездротова+15W",
        badges: ["sale"],
        description: "Магнітна бездротова зарядка"
    },
    {
        id: 10,
        name: "Кабель USB-C to USB-C 2м 100W",
        category: "cables",
        price: 499,
        oldPrice: null,
        sku: "CB-USBC-USBC-010",
        barcode: "4820001234576",
        stock: 150,
        rating: 4.8,
        reviews: 134,
        image: "https://via.placeholder.com/400x400/6366f1/ffffff?text=Кабель+USBC",
        badges: [],
        description: "Кабель для швидкої зарядки ноутбуків"
    },
    {
        id: 11,
        name: "Навушники Sony WF-1000XM5",
        category: "audio",
        price: 9999,
        oldPrice: null,
        sku: "AU-SONY-XM5-011",
        barcode: "4820001234577",
        stock: 8,
        rating: 4.9,
        reviews: 215,
        image: "https://via.placeholder.com/400x400/dc2626/ffffff?text=Sony+WF-1000XM5",
        badges: ["hit"],
        description: "Топові навушники з найкращим шумопоглинанням"
    },
    {
        id: 12,
        name: "Захисне скло Privacy для iPhone 15 Pro",
        category: "protection",
        price: 599,
        oldPrice: null,
        sku: "PR-PRV-IP15P-012",
        barcode: "4820001234578",
        stock: 42,
        rating: 4.6,
        reviews: 67,
        image: "https://via.placeholder.com/400x400/a855f7/ffffff?text=Скло+Privacy",
        badges: [],
        description: "Антишпигунське скло з приватністю"
    },
    {
        id: 13,
        name: "Тримач автомобільний Gravity Link Mount",
        category: "holders",
        price: 799,
        oldPrice: 999,
        sku: "HL-GRV-LNK-013",
        barcode: "4820001234579",
        stock: 55,
        rating: 4.7,
        reviews: 88,
        image: "https://via.placeholder.com/400x400/0ea5e9/ffffff?text=Тримач+Gravity",
        badges: ["sale"],
        description: "Автоматичне захоплення телефону"
    },
    {
        id: 14,
        name: "PowerBank Slim 10000mAh Wireless",
        category: "powerbank",
        price: 1599,
        oldPrice: null,
        sku: "PB-10K-WRL-014",
        barcode: "4820001234580",
        stock: 38,
        rating: 4.6,
        reviews: 102,
        image: "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=PowerBank+Slim",
        badges: ["new"],
        description: "Тонкий пауербанк з бездротовою зарядкою"
    },
    {
        id: 15,
        name: "Чохол Clear Case Transparent для iPhone 15",
        category: "cases",
        price: 499,
        oldPrice: 699,
        sku: "CS-CLR-IP15-015",
        barcode: "4820001234581",
        stock: 95,
        rating: 4.4,
        reviews: 178,
        image: "https://via.placeholder.com/400x400/64748b/ffffff?text=Прозорий+чохол",
        badges: ["sale"],
        description: "Прозорий чохол з захистом від жовтизни"
    },
    {
        id: 16,
        name: "Зарядний пристрій GaN 65W 3 порти",
        category: "chargers",
        price: 1499,
        oldPrice: null,
        sku: "CH-GAN-65W-016",
        barcode: "4820001234582",
        stock: 45,
        rating: 4.9,
        reviews: 156,
        image: "https://via.placeholder.com/400x400/22c55e/ffffff?text=GaN+65W",
        badges: ["hit", "new"],
        description: "Компактна зарядка з технологією GaN"
    }
];

// ==================== STATE ====================
let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let compare = JSON.parse(localStorage.getItem('compare')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentCategory = 'all';
let currentView = 'grid';
let currentStep = 1;
let promoDiscount = 0;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderProducts();
    updateBadges();
    initSearch();
    loadProfile();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[data-category]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentCategory = link.dataset.category;
            renderProducts();
        });
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('show');
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ==================== PRODUCTS ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    let filtered = filterProducts();
    filtered = sortProducts(filtered);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px;"><h3>Товари не знайдено</h3><p>Спробуйте змінити параметри фільтрації</p></div>';
        return;
    }
    
    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
}

function filterProducts() {
    let filtered = [...products];
    
    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.sku.toLowerCase().includes(searchTerm) ||
            p.barcode.includes(searchTerm)
        );
    }
    
    // Price filter
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
    
    // Stock filter
    if (document.getElementById('inStockOnly').checked) {
        filtered = filtered.filter(p => p.stock > 0);
    }
    
    return filtered;
}

function sortProducts(productsToSort = null) {
    const products = productsToSort || filterProducts();
    const sortValue = document.getElementById('sortSelect').value;
    
    switch(sortValue) {
        case 'price-asc':
            return products.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return products.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return products.sort((a, b) => b.name.localeCompare(a.name));
        case 'newest':
            return products.sort((a, b) => b.id - a.id);
        default:
            return products;
    }
}

function createProductCard(product) {
    const badgesHTML = product.badges.map(badge => {
        const labels = { new: 'Новинка', sale: 'Акція', hit: 'Хіт' };
        return `<span class="badge-${badge}">${labels[badge]}</span>`;
    }).join('');
    
    const stockStatus = product.stock > 20 ? 
        '<span class="stock-available">✓ В наявності</span>' :
        product.stock > 0 ? 
        '<span class="stock-low">⚠ Закінчується</span>' :
        '<span class="stock-out">✗ Немає</span>';
    
    const oldPriceHTML = product.oldPrice ? 
        `<span class="old-price">${product.oldPrice.toLocaleString()} ₴</span>` : '';
    
    const isInWishlist = wishlist.includes(product.id);
    const isInCompare = compare.includes(product.id);
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">${badgesHTML}</div>
                <div class="product-actions">
                    <button onclick="toggleWishlistItem(${product.id})" title="В обране">
                        <i class="fas fa-heart" style="${isInWishlist ? 'color: #ef4444;' : ''}"></i>
                    </button>
                    <button onclick="toggleCompareItem(${product.id})" title="Порівняти">
                        <i class="fas fa-exchange-alt" style="${isInCompare ? 'color: #2563eb;' : ''}"></i>
                    </button>
                    <button onclick="quickView(${product.id})" title="Швидкий перегляд">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString()} ₴</span>
                    ${oldPriceHTML}
                </div>
                <div class="product-stock">${stockStatus}</div>
                <div class="product-sku">Артикул: ${product.sku}</div>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock === 0 ? 'Немає в наявності' : 'В кошик'}
                </button>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        cases: 'Чохли',
        chargers: 'Зарядні пристрої',
        cables: 'Кабелі',
        audio: 'Навушники',
        protection: 'Захисне скло',
        holders: 'Тримачі',
        powerbank: 'PowerBank'
    };
    return names[category] || category;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function setView(view) {
    currentView = view;
    const grid = document.getElementById('productsGrid');
    const buttons = document.querySelectorAll('.view-toggle button');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('button').classList.add('active');
    
    if (view === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}

function filterByCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === category) {
            link.classList.add('active');
        }
    });
    renderProducts();
    scrollToProducts();
}

function filterByPrice() {
    renderProducts();
}

function filterByStock() {
    renderProducts();
}

function clearFilters() {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('inStockOnly').checked = false;
    document.getElementById('searchInput').value = '';
    currentCategory = 'all';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === 'all') {
            link.classList.add('active');
        }
    });
    renderProducts();
}

function searchProducts() {
    renderProducts();
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// ==================== CART ====================
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        showToast('Товар відсутній на складі', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
            showToast('Недостатньо товару на складі', 'warning');
            return;
        }
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    saveCart();
    updateBadges();
    showToast('Товар додано до кошика', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateBadges();
    renderCart();
}

function updateQuantity(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (quantity > product.stock) {
        showToast('Максимальна кількість: ' + product.stock, 'warning');
        quantity = product.stock;
    }
    
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateBadges() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('wishlistCount').textContent = wishlist.length;
    document.getElementById('compareCount').textContent = compare.length;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--gray-500);"><i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 20px;"></i><p>Кошик порожній</p></div>';
        updateCartSummary();
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price.toLocaleString()} ₴</div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, parseInt(this.value))">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="cart-item-total">
                <strong>${(item.price * item.quantity).toLocaleString()} ₴</strong>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * promoDiscount;
    const total = subtotal - discount;
    
    document.getElementById('cartSubtotal').textContent = subtotal.toLocaleString() + ' ₴';
    document.getElementById('cartDiscount').textContent = '-' + discount.toLocaleString() + ' ₴';
    document.getElementById('cartTotal').textContent = total.toLocaleString() + ' ₴';
}

function applyPromoCode() {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();
    const validCodes = {
        'CASE20': 0.20,
        'NEW10': 0.10,
        'SALE15': 0.15
    };
    
    if (validCodes[code]) {
        promoDiscount = validCodes[code];
        showToast(`Промокод застосовано! Знижка ${(promoDiscount * 100).toFixed(0)}%`, 'success');
        renderCart();
    } else {
        showToast('Невірний промокод', 'error');
    }
}

// ==================== WISHLIST ====================
function toggleWishlist() {
    const modal = document.getElementById('wishlistModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        renderWishlist();
    }
}

function toggleWishlistItem(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Видалено з обраного', 'warning');
    } else {
        wishlist.push(productId);
        showToast('Додано до обраного', 'success');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateBadges();
    renderProducts();
}

function renderWishlist() {
    const container = document.getElementById('wishlistItems');
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    
    if (wishlistProducts.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--gray-500);"><i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 20px;"></i><p>Список обраного порожній</p></div>';
        return;
    }
    
    container.innerHTML = wishlistProducts.map(product => createProductCard(product)).join('');
}

// ==================== COMPARE ====================
function toggleCompare() {
    const modal = document.getElementById('compareModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        renderCompare();
    }
}

function toggleCompareItem(productId) {
    const index = compare.indexOf(productId);
    if (index > -1) {
        compare.splice(index, 1);
        showToast('Видалено з порівняння', 'warning');
    } else {
        if (compare.length >= 3) {
            showToast('Можна порівнювати максимум 3 товари', 'error');
            return;
        }
        compare.push(productId);
        showToast('Додано до порівняння', 'success');
    }
    localStorage.setItem('compare', JSON.stringify(compare));
    updateBadges();
    renderProducts();
}

function renderCompare() {
    const container = document.getElementById('compareItems');
    const compareProducts = products.filter(p => compare.includes(p.id));
    
    if (compareProducts.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--gray-500);"><i class="fas fa-exchange-alt" style="font-size: 3rem; margin-bottom: 20px;"></i><p>Немає товарів для порівняння</p></div>';
        return;
    }
    
    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="padding: 15px; text-align: left; background: var(--gray-100);">Характеристика</th>
                    ${compareProducts.map(p => `<th style="padding: 15px; background: var(--gray-100);"><img src="${p.image}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;"><br>${p.name}</th>`).join('')}
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600;">Ціна</td>
                    ${compareProducts.map(p => `<td style="padding: 15px; color: var(--primary-color); font-weight: 700;">${p.price.toLocaleString()} ₴</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600;">Наявність</td>
                    ${compareProducts.map(p => `<td style="padding: 15px;">${p.stock > 0 ? '✓ В наявності (' + p.stock + ')' : '✗ Немає'}</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600;">Рейтинг</td>
                    ${compareProducts.map(p => `<td style="padding: 15px;">${generateStars(p.rating)} (${p.reviews})</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600;">Артикул</td>
                    ${compareProducts.map(p => `<td style="padding: 15px;">${p.sku}</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600;">Опис</td>
                    ${compareProducts.map(p => `<td style="padding: 15px;">${p.description}</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding: 15px;"></td>
                    ${compareProducts.map(p => `<td style="padding: 15px;"><button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">В кошик</button></td>`).join('')}
                </tr>
            </table>
        </div>
    `;
}

// ==================== CHECKOUT ====================
function checkout() {
    if (cart.length === 0) {
        showToast('Кошик порожній', 'error');
        return;
    }
    toggleCart();
    document.getElementById('checkoutModal').classList.add('show');
    currentStep = 1;
    updateCheckoutStep();
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
}

function changeStep(direction) {
    if (direction === 1 && !validateStep(currentStep)) {
        return;
    }
    
    currentStep += direction;
    if (currentStep > 3) {
        submitOrder();
        return;
    }
    updateCheckoutStep();
}

function validateStep(step) {
    if (step === 1) {
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        
        if (!name || !phone || !email) {
            showToast('Заповніть всі обов\'язкові поля', 'error');
            return false;
        }
        
        if (!/^(\+)?3?8?(0\d{9})$/.test(phone.replace(/\s/g, ''))) {
            showToast('Введіть коректний номер телефону', 'error');
            return false;
        }
    }
    
    if (step === 2) {
        const city = document.getElementById('deliveryCity').value.trim();
        const branch = document.getElementById('deliveryBranch').value.trim();
        
        if (!city || !branch) {
            showToast('Заповніть всі обов\'язкові поля', 'error');
            return false;
        }
    }
    
    return true;
}

function updateCheckoutStep() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
    
    document.querySelectorAll('.checkout-step-content').forEach((content, index) => {
        content.classList.toggle('active', index + 1 === currentStep);
    });
    
    document.getElementById('prevStep').style.display = currentStep === 1 ? 'none' : 'block';
    document.getElementById('nextStep').textContent = currentStep === 3 ? 'Оформити замовлення' : 'Далі';
}

function submitOrder() {
    const order = {
        id: Date.now(),
        number: 'ORD-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        date: new Date().toISOString(),
        items: [...cart],
        customer: {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value
        },
        delivery: {
            city: document.getElementById('deliveryCity').value,
            branch: document.getElementById('deliveryBranch').value,
            comment: document.getElementById('deliveryComment').value
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: promoDiscount,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (1 - promoDiscount),
        status: 'pending'
    };
    
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
    promoDiscount = 0;
    saveCart();
    updateBadges();
    
    closeCheckout();
    showToast('Замовлення оформлено! Номер: ' + order.number, 'success');
    
    // Show order confirmation
    setTimeout(() => {
        alert(`Дякуємо за замовлення!\n\nНомер замовлення: ${order.number}\nСума: ${order.total.toLocaleString()} ₴\n\nМенеджер зв'яжеться з вами найближчим часом.`);
    }, 500);
}

// Phone mask
document.addEventListener('input', function(e) {
    if (e.target.id === 'customerPhone') {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('380')) {
            value = value.substring(3);
        } else if (value.startsWith('80')) {
            value = value.substring(2);
        } else if (value.startsWith('0')) {
            value = value.substring(1);
        }
        
        if (value.length > 0) {
            value = '+38 (' + value.substring(0, 2);
            if (value.length > 7) {
                value = value.substring(0, 7) + ') ' + value.substring(7, 10);
            }
            if (value.length > 12) {
                value = value.substring(0, 12) + '-' + value.substring(12, 14);
            }
            if (value.length > 15) {
                value = value.substring(0, 15) + '-' + value.substring(15, 17);
            }
        } else {
            value = '+38 ';
        }
        e.target.value = value;
    }
});

// ==================== PROFILE ====================
function toggleProfile() {
    const modal = document.getElementById('profileModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        renderOrderHistory();
    }
}

function showProfileTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
}

function renderOrderHistory() {
    const container = document.getElementById('orderHistory');
    
    if (orders.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--gray-500);"><i class="fas fa-box" style="font-size: 3rem; margin-bottom: 20px;"></i><p>У вас ще немає замовлень</p></div>';
        return;
    }
    
    const statusLabels = {
        pending: 'Очікує підтвердження',
        processing: 'Обробляється',
        shipped: 'Відправлено',
        delivered: 'Доставлено',
        cancelled: 'Скасовано'
    };
    
    container.innerHTML = orders.slice().reverse().map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-number">${order.number}</span>
                <span class="order-status status-${order.status}">${statusLabels[order.status]}</span>
            </div>
            <div class="order-details">
                <div><strong>Дата:</strong> ${new Date(order.date).toLocaleDateString('uk-UA')}</div>
                <div><strong>Сума:</strong> ${order.total.toLocaleString()} ₴</div>
                <div><strong>Товарів:</strong> ${order.items.reduce((sum, item) => sum + item.quantity, 0)}</div>
            </div>
        </div>
    `).join('');
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    document.getElementById('profileName').value = profile.name || '';
    document.getElementById('profilePhone').value = profile.phone || '';
    document.getElementById('profileEmail').value = profile.email || '';
}

function saveProfile() {
    const profile = {
        name: document.getElementById('profileName').value,
        phone: document.getElementById('profilePhone').value,
        email: document.getElementById('profileEmail').value
    };
    localStorage.setItem('profile', JSON.stringify(profile));
    showToast('Профіль збережено', 'success');
}

// ==================== UTILS ====================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>${product.name}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-lg);">
                    <div>
                        <div class="product-category">${getCategoryName(product.category)}</div>
                        <h2 style="margin: 10px 0;">${product.name}</h2>
                        <div class="product-rating" style="margin: 15px 0;">
                            ${generateStars(product.rating)}
                            <span>(${product.reviews} відгуків)</span>
                        </div>
                        <div class="product-price" style="margin: 20px 0;">
                            <span class="current-price" style="font-size: 2rem;">${product.price.toLocaleString()} ₴</span>
                            ${product.oldPrice ? `<span class="old-price" style="font-size: 1.5rem;">${product.oldPrice.toLocaleString()} ₴</span>` : ''}
                        </div>
                        <p style="color: var(--gray-600); margin: 20px 0;">${product.description}</p>
                        <div style="margin: 20px 0;">
                            <strong>Артикул:</strong> ${product.sku}<br>
                            <strong>Штрихкод:</strong> ${product.barcode}<br>
                            <strong>Наявність:</strong> ${product.stock > 0 ? product.stock + ' шт.' : 'Немає'}
                        </div>
                        <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); this.closest('.modal').remove();" ${product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.stock === 0 ? 'Немає в наявності' : 'Додати до кошика'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
}

// Close modals on outside click
document.addEventListener('click', (e) => {
    document.querySelectorAll('.modal.show').forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

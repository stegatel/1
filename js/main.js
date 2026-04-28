// Main Application
const app = {
    data: {
        products: [],
        cart: [],
        wishlist: [],
        compare: [],
        orders: [],
        currentCategory: 'all',
        promoApplied: null
    },

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCounts();
    },

    loadData() {
        // Load products from localStorage or use defaults
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            this.data.products = JSON.parse(storedProducts);
        } else {
            this.data.products = this.getDefaultProducts();
            localStorage.setItem('products', JSON.stringify(this.data.products));
        }

        // Load cart
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.data.cart = JSON.parse(storedCart);
        }

        // Load wishlist
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            this.data.wishlist = JSON.parse(storedWishlist);
        }

        // Load compare
        const storedCompare = localStorage.getItem('compare');
        if (storedCompare) {
            this.data.compare = JSON.parse(storedCompare);
        }

        // Load orders
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            this.data.orders = JSON.parse(storedOrders);
        }
    },

    getDefaultProducts() {
        return [
            { id: 1, name: "Чохол Silicone Pro iPhone 15", category: "cases", price: 499, oldPrice: 699, stock: 25, rating: 4.8, image: "https://images.unsplash.com/photo-1603351154351-5cf99bc75417?w=400", badge: "sale", sku: "CS-IP15-001", barcode: "4820001234567" },
            { id: 2, name: "Чохол Leather Case Samsung S24", category: "cases", price: 899, oldPrice: null, stock: 15, rating: 4.9, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400", badge: "new", sku: "CS-S24-002", barcode: "4820001234568" },
            { id: 3, name: "Зарядний пристрій USB-C 25W", category: "chargers", price: 599, oldPrice: null, stock: 50, rating: 4.7, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400", badge: "hit", sku: "CH-USBC-003", barcode: "4820001234569" },
            { id: 4, name: "Бездротова зарядка 15W", category: "chargers", price: 799, oldPrice: 999, stock: 8, rating: 4.6, image: "https://images.unsplash.com/photo-1616150844441-8cafc5fb07ae?w=400", badge: "sale", sku: "CH-WL-004", barcode: "4820001234570" },
            { id: 5, name: "Кабель USB-C to Lightning 2m", category: "cables", price: 399, oldPrice: null, stock: 100, rating: 4.5, image: "https://images.unsplash.com/photo-1601513445506-2ab0d2af3f0b?w=400", badge: null, sku: "CB-LT-005", barcode: "4820001234571" },
            { id: 6, name: "Кабель USB-C to USB-C 1m", category: "cables", price: 299, oldPrice: null, stock: 150, rating: 4.4, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400", badge: null, sku: "CB-CC-006", barcode: "4820001234572" },
            { id: 7, name: "Навушники AirPods Pro 2", category: "audio", price: 8999, oldPrice: 10999, stock: 12, rating: 4.9, image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400", badge: "sale", sku: "AU-APP2-007", barcode: "4820001234573" },
            { id: 8, name: "Навушники Galaxy Buds2", category: "audio", price: 3999, oldPrice: null, stock: 20, rating: 4.7, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", badge: "hit", sku: "AU-GB2-008", barcode: "4820001234574" },
            { id: 9, name: "Захисне скло Tempered Glass", category: "protection", price: 199, oldPrice: 299, stock: 200, rating: 4.3, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400", badge: "sale", sku: "PR-TG-009", barcode: "4820001234575" },
            { id: 10, name: "Гідрогелева плівка 2шт", category: "protection", price: 349, oldPrice: null, stock: 75, rating: 4.6, image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400", badge: null, sku: "PR-HF-010", barcode: "4820001234576" },
            { id: 11, name: "Автомобільний тримач MagSafe", category: "holders", price: 699, oldPrice: null, stock: 30, rating: 4.8, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", badge: "new", sku: "HD-MS-011", barcode: "4820001234577" },
            { id: 12, name: "Тримач на вентиляцію", category: "holders", price: 299, oldPrice: 399, stock: 45, rating: 4.4, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", badge: "sale", sku: "HD-VT-012", barcode: "4820001234578" },
            { id: 13, name: "PowerBank 20000mAh", category: "powerbank", price: 1299, oldPrice: null, stock: 35, rating: 4.7, image: "https://images.unsplash.com/photo-1609560029899-20c4c0f81223?w=400", badge: "hit", sku: "PB-20K-013", barcode: "4820001234579" },
            { id: 14, name: "PowerBank 10000mAh Slim", category: "powerbank", price: 799, oldPrice: 999, stock: 5, rating: 4.5, image: "https://images.unsplash.com/photo-1616150844441-8cafc5fb07ae?w=400", badge: "sale", sku: "PB-10K-014", barcode: "4820001234580" },
            { id: 15, name: "Чохол Clear Transparent", category: "cases", price: 249, oldPrice: null, stock: 80, rating: 4.2, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400", badge: null, sku: "CS-CL-015", barcode: "4820001234581" },
            { id: 16, name: "Зарядний кабель 3в1", category: "cables", price: 449, oldPrice: null, stock: 60, rating: 4.6, image: "https://images.unsplash.com/photo-1601513445506-2ab0d2af3f0b?w=400", badge: "new", sku: "CB-3IN1-016", barcode: "4820001234582" }
        ];
    },

    setupEventListeners() {
        // Category navigation
        document.querySelectorAll('.nav-list li').forEach(li => {
            li.addEventListener('click', () => {
                document.querySelectorAll('.nav-list li').forEach(l => l.classList.remove('active'));
                li.classList.add('active');
                this.data.currentCategory = li.dataset.cat;
                this.renderProducts();
            });
        });

        // Phone input mask
        const phoneInput = document.getElementById('custPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('380')) {
                    value = value.substring(3);
                }
                if (value.length > 9) value = value.substring(0, 9);
                
                let formatted = '+380';
                if (value.length > 0) formatted += ' (' + value.substring(0, 2);
                if (value.length > 2) formatted += ') ' + value.substring(2, 5);
                if (value.length > 5) formatted += '-' + value.substring(5, 7);
                if (value.length > 7) formatted += '-' + value.substring(7, 9);
                
                e.target.value = formatted;
            });
        }
    },

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        let products = [...this.data.products];

        // Filter by category
        if (this.data.currentCategory !== 'all') {
            products = products.filter(p => p.category === this.data.currentCategory);
        }

        // Search filter
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim()) {
            const query = searchInput.value.toLowerCase();
            products = products.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.sku.toLowerCase().includes(query) ||
                p.barcode.includes(query)
            );
        }

        // Sort
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            switch(sortSelect.value) {
                case 'price-asc': products.sort((a,b) => a.price - b.price); break;
                case 'price-desc': products.sort((a,b) => b.price - a.price); break;
                case 'name': products.sort((a,b) => a.name.localeCompare(b.name)); break;
            }
        }

        grid.innerHTML = products.map(product => {
            const inWishlist = this.data.wishlist.includes(product.id);
            const inCompare = this.data.compare.includes(product.id);
            
            let stockClass = 'stock-in';
            let stockText = 'В наявності';
            if (product.stock <= 5) {
                stockClass = 'stock-low';
                stockText = 'Закінчується';
            }
            if (product.stock === 0) {
                stockClass = 'stock-out';
                stockText = 'Немає в наявності';
            }

            return `
                <div class="product-card">
                    ${product.badge ? `<div class="product-badges"><span class="badge-${product.badge}">${this.getBadgeText(product.badge)}</span></div>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <div class="product-info">
                        <div class="product-category">${this.getCategoryName(product.category)}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">${this.renderStars(product.rating)}</div>
                        <div class="product-price">
                            <span class="current-price">${product.price} грн</span>
                            ${product.oldPrice ? `<span class="old-price">${product.oldPrice} грн</span>` : ''}
                        </div>
                        <div class="stock-status ${stockClass}">${stockText} (${product.stock} шт)</div>
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="app.addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                                ${product.stock === 0 ? 'Немає' : 'У кошик'}
                            </button>
                            <button class="btn-icon ${inWishlist ? 'active' : ''}" onclick="app.toggleWishlistItem(${product.id})">
                                <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                            <button class="btn-icon ${inCompare ? 'active' : ''}" onclick="app.toggleCompareItem(${product.id})">
                                <i class="fas fa-exchange-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    getBadgeText(badge) {
        const texts = { new: 'Новинка', sale: 'Акція', hit: 'Хіт' };
        return texts[badge] || '';
    },

    getCategoryName(cat) {
        const names = {
            cases: 'Чохли', chargers: 'Зарядні', cables: 'Кабелі',
            audio: 'Навушники', protection: 'Захист', holders: 'Тримачі', powerbank: 'PowerBank'
        };
        return names[cat] || cat;
    },

    renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < full; i++) stars += '<i class="fas fa-star"></i>';
        if (half) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = stars.length / 20; i < 5; i++) stars += '<i class="far fa-star"></i>';
        return stars + ` <span>(${rating})</span>`;
    },

    addToCart(id) {
        const product = this.data.products.find(p => p.id === id);
        if (!product || product.stock === 0) return;

        const existing = this.data.cart.find(item => item.id === id);
        if (existing) {
            if (existing.qty < product.stock) {
                existing.qty++;
                this.showToast('Кількість збільшено', 'success');
            } else {
                this.showToast('Максимальна кількість в кошику', 'warning');
                return;
            }
        } else {
            this.data.cart.push({ ...product, qty: 1 });
            this.showToast('Додано до кошика', 'success');
        }

        this.saveCart();
        this.updateCounts();
        this.renderCart();
    },

    removeFromCart(id) {
        this.data.cart = this.data.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCounts();
        this.renderCart();
        this.showToast('Видалено з кошика', 'success');
    },

    updateQty(id, delta) {
        const item = this.data.cart.find(i => i.id === id);
        if (!item) return;

        const product = this.data.products.find(p => p.id === id);
        item.qty += delta;

        if (item.qty <= 0) {
            this.removeFromCart(id);
            return;
        }

        if (item.qty > product.stock) {
            item.qty = product.stock;
            this.showToast('Максимальна кількість', 'warning');
        }

        this.saveCart();
        this.renderCart();
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.data.cart));
    },

    renderCart() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        if (this.data.cart.length === 0) {
            container.innerHTML = '<p style="text-align:center;padding:40px;">Кошик порожній</p>';
            document.getElementById('cartTotalSum').textContent = '0 грн';
            return;
        }

        let total = 0;
        container.innerHTML = this.data.cart.map(item => {
            total += item.price * item.qty;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price} грн</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="app.updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="app.updateQty(${item.id}, 1)">+</button>
                            <button class="qty-btn" style="color:red;margin-left:10px;" onclick="app.removeFromCart(${item.id})">&times;</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (this.data.promoApplied) {
            const discount = total * this.data.promoApplied.discount;
            total -= discount;
            container.innerHTML += `<div style="color:var(--success);margin-top:10px;">Знижка ${this.data.promoApplied.code}: -${discount.toFixed(0)} грн</div>`;
        }

        document.getElementById('cartTotalSum').textContent = `${total.toFixed(0)} грн`;
    },

    toggleCart() {
        const modal = document.getElementById('cartModal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        if (modal.style.display === 'block') this.renderCart();
    },

    updateCounts() {
        document.getElementById('cartCount').textContent = this.data.cart.reduce((sum, item) => sum + item.qty, 0);
        document.getElementById('wishlistCount').textContent = this.data.wishlist.length;
        document.getElementById('compareCount').textContent = this.data.compare.length;
    },

    toggleWishlistItem(id) {
        const index = this.data.wishlist.indexOf(id);
        if (index > -1) {
            this.data.wishlist.splice(index, 1);
            this.showToast('Видалено з обраного', 'success');
        } else {
            this.data.wishlist.push(id);
            this.showToast('Додано до обраного', 'success');
        }
        localStorage.setItem('wishlist', JSON.stringify(this.data.wishlist));
        this.updateCounts();
        this.renderProducts();
        this.renderWishlist();
    },

    toggleWishlist() {
        const modal = document.getElementById('wishlistModal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        if (modal.style.display === 'block') this.renderWishlist();
    },

    renderWishlist() {
        const container = document.getElementById('wishlistItems');
        if (!container) return;

        const items = this.data.products.filter(p => this.data.wishlist.includes(p.id));
        if (items.length === 0) {
            container.innerHTML = '<p style="text-align:center;padding:40px;">Обране порожнє</p>';
            return;
        }

        container.innerHTML = items.map(p => `
            <div class="cart-item">
                <img src="${p.image}" alt="${p.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${p.name}</div>
                    <div class="cart-item-price">${p.price} грн</div>
                    <button class="btn-add-cart" style="margin-top:10px;" onclick="app.addToCart(${p.id});app.toggleWishlist()">У кошик</button>
                </div>
            </div>
        `).join('');
    },

    toggleCompareItem(id) {
        const index = this.data.compare.indexOf(id);
        if (index > -1) {
            this.data.compare.splice(index, 1);
            this.showToast('Видалено з порівняння', 'success');
        } else {
            if (this.data.compare.length >= 3) {
                this.showToast('Максимум 3 товари для порівняння', 'warning');
                return;
            }
            this.data.compare.push(id);
            this.showToast('Додано до порівняння', 'success');
        }
        localStorage.setItem('compare', JSON.stringify(this.data.compare));
        this.updateCounts();
        this.renderProducts();
    },

    toggleCompare() {
        const modal = document.getElementById('compareModal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        if (modal.style.display === 'block') this.renderCompare();
    },

    renderCompare() {
        const container = document.getElementById('compareItems');
        if (!container) return;

        const items = this.data.products.filter(p => this.data.compare.includes(p.id));
        if (items.length === 0) {
            container.innerHTML = '<p style="text-align:center;padding:40px;">Немає товарів для порівняння</p>';
            return;
        }

        container.innerHTML = `
            <div style="display:grid;grid-template-columns:repeat(${items.length},1fr);gap:20px;">
                ${items.map(p => `
                    <div style="text-align:center;">
                        <img src="${p.image}" style="width:100%;height:200px;object-fit:cover;border-radius:8px;">
                        <h4 style="margin:15px 0 10px;">${p.name}</h4>
                        <div style="color:var(--primary);font-weight:bold;font-size:18px;">${p.price} грн</div>
                        <div style="margin:10px 0;">${this.renderStars(p.rating)}</div>
                        <button class="btn-add-cart" onclick="app.addToCart(${p.id})">У кошик</button>
                        <button class="btn-icon" style="margin-top:10px;color:red;" onclick="app.toggleCompareItem(${p.id});app.renderCompare();">&times; Видалити</button>
                    </div>
                `).join('')}
            </div>
        `;
    },

    openCheckout() {
        if (this.data.cart.length === 0) {
            this.showToast('Кошик порожній', 'warning');
            return;
        }
        document.getElementById('cartModal').style.display = 'none';
        document.getElementById('checkoutModal').style.display = 'block';
    },

    closeCheckout() {
        document.getElementById('checkoutModal').style.display = 'none';
    },

    submitOrder(e) {
        e.preventDefault();

        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            customer: {
                name: document.getElementById('custName').value,
                phone: document.getElementById('custPhone').value,
                email: document.getElementById('custEmail').value
            },
            delivery: {
                city: document.getElementById('delCity').value,
                branch: document.getElementById('delBranch').value
            },
            payment: document.querySelector('input[name="payment"]:checked').value,
            items: [...this.data.cart],
            total: this.calculateTotal(),
            status: 'new'
        };

        // Update stock
        order.items.forEach(item => {
            const product = this.data.products.find(p => p.id === item.id);
            if (product) product.stock -= item.qty;
        });

        this.data.orders.push(order);
        localStorage.setItem('orders', JSON.stringify(this.data.orders));
        localStorage.setItem('products', JSON.stringify(this.data.products));

        // Clear cart
        this.data.cart = [];
        this.data.promoApplied = null;
        this.saveCart();
        this.updateCounts();

        this.closeCheckout();
        this.renderProducts();
        
        this.showToast(`Замовлення #${order.id} оформлено!`, 'success');
        
        setTimeout(() => {
            alert(`Дякуємо за замовлення!\nНомер: ${order.id}\nСума: ${order.total} грн\nМенеджер зв'яжеться з вами найближчим часом.`);
        }, 500);
    },

    calculateTotal() {
        let total = this.data.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        if (this.data.promoApplied) {
            total -= total * this.data.promoApplied.discount;
        }
        return total.toFixed(0);
    },

    applyPromo() {
        const code = document.getElementById('promoCode').value.trim().toUpperCase();
        const promos = {
            'CASE20': 0.20,
            'NEW10': 0.10,
            'SALE15': 0.15
        };

        if (promos[code]) {
            this.data.promoApplied = { code, discount: promos[code] };
            this.showToast(`Промокод ${code} застосовано!`, 'success');
            this.renderCart();
        } else {
            this.showToast('Невірний промокод', 'error');
        }
    },

    searchProducts() {
        this.renderProducts();
    },

    scrollToCatalog() {
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    },

    showInfo(type) {
        const modal = document.getElementById('infoModal');
        const title = document.getElementById('infoTitle');
        const content = document.getElementById('infoContent');

        const info = {
            about: {
                title: 'Про нас',
                content: `<p>TechAccessory - провідний магазин мобільних аксесуарів в Україні з 2020 року.</p>
                          <p>Ми пропонуємо тільки оригінальну продукцію від перевірених виробників.</p>
                          <p>Наші переваги:</p>
                          <ul style="margin:15px 0 15px 20px;">
                              <li>Гарантія якості</li>
                              <li>Швидка доставка по всій Україні</li>
                              <li>Вигідні ціни</li>
                              <li>Професійна консультація</li>
                          </ul>`
            },
            delivery: {
                title: 'Доставка і оплата',
                content: `<p><strong>Доставка:</strong></p>
                          <ul style="margin:10px 0 15px 20px;">
                              <li>Нова Пошта - 1-2 дні</li>
                              <li>Укрпошта - 3-5 днів</li>
                              <li>Кур'єром по Києву - 1 день</li>
                          </ul>
                          <p><strong>Оплата:</strong></p>
                          <ul style="margin:10px 0 15px 20px;">
                              <li>Карткою онлайн</li>
                              <li>При отриманні</li>
                              <li>Безготівковий розрахунок</li>
                          </ul>`
            },
            warranty: {
                title: 'Гарантія',
                content: `<p>На всі товари надається гарантія від 6 до 12 місяців.</p>
                          <p>Гарантійні випадки:</p>
                          <ul style="margin:10px 0 15px 20px;">
                              <li>Виробничий брак</li>
                              <li>Передчасний вихід з ладу</li>
                          </ul>
                          <p>Гарантія не поширюється на механічні пошкодження.</p>`
            },
            return: {
                title: 'Повернення',
                content: `<p>Повернення можливе протягом 14 днів з моменту покупки.</p>
                          <p>Умови повернення:</p>
                          <ul style="margin:10px 0 15px 20px;">
                              <li>Товар не був у використанні</li>
                              <li>Збережено упаковку</li>
                              <li>Наявність чека</li>
                          </ul>
                          <p>Повернення коштів здійснюється протягом 3-5 робочих днів.</p>`
            }
        };

        if (info[type]) {
            title.textContent = info[type].title;
            content.innerHTML = info[type].content;
            modal.style.display = 'block';
        }
    },

    toggleProfile() {
        const modal = document.getElementById('profileModal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        
        if (modal.style.display === 'block') {
            const content = document.getElementById('profileContent');
            const userOrders = this.data.orders.slice(-5);
            
            if (userOrders.length > 0) {
                content.innerHTML = `
                    <h3>Історія замовлень</h3>
                    ${userOrders.map(o => `
                        <div style="border:1px solid var(--border);padding:15px;margin:10px 0;border-radius:8px;">
                            <div><strong>Замовлення #${o.id}</strong> від ${new Date(o.date).toLocaleDateString()}</div>
                            <div>Сума: ${o.total} грн</div>
                            <div>Статус: <span style="color:var(--primary)">${this.getStatusText(o.status)}</span></div>
                        </div>
                    `).join('')}
                `;
            } else {
                content.innerHTML = '<p>У вас ще немає замовлень</p><button class="btn-primary" onclick="document.getElementById(\'profileModal\').style.display=\'none\'">До покупок</button>';
            }
        }
    },

    getStatusText(status) {
        const texts = { new: 'Нове', processing: 'В обробці', shipped: 'Відправлено', delivered: 'Доставлено', cancelled: 'Скасовано' };
        return texts[status] || status;
    },

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

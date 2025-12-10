<template>
    <div>
        <!-- HEADER -->
        <header class="header">
            <div class="header-left">
                <!-- Кнопка бургер-меню с выпадающим каталогом -->
                <div class="burger-container">
                    <button class="burger" aria-label="menu" @click="toggleCatalogMenu">
                        ☰
                    </button>
                    <!-- Выпадающее меню каталога -->
                    <div v-if="showCatalogMenu" class="catalog-dropdown">
                        <div class="catalog-dropdown-header">Каталог товаров</div>
                        <div class="catalog-dropdown-content">
                            <NuxtLink to="/catalog/sneakers"
                                      class="catalog-item"
                                      @click="hideCatalogMenu">
                                <div class="catalog-item-icon">👟</div>
                                <div class="catalog-item-text">Кроссовки</div>
                            </NuxtLink>
                            <NuxtLink to="/catalog/shoes"
                                      class="catalog-item"
                                      @click="hideCatalogMenu">
                                <div class="catalog-item-icon">👞</div>
                                <div class="catalog-item-text">Обувь</div>
                            </NuxtLink>
                            <NuxtLink to="/catalog/sports"
                                      class="catalog-item"
                                      @click="hideCatalogMenu">
                                <div class="catalog-item-icon">🏃</div>
                                <div class="catalog-item-text">Спортивная обувь</div>
                            </NuxtLink>
                            <NuxtLink to="/catalog/casual"
                                      class="catalog-item"
                                      @click="hideCatalogMenu">
                                <div class="catalog-item-icon">👟</div>
                                <div class="catalog-item-text">Повседневная</div>
                            </NuxtLink>
                            <NuxtLink to="/catalog/accessories"
                                      class="catalog-item"
                                      @click="hideCatalogMenu">
                                <div class="catalog-item-icon">🎽</div>
                                <div class="catalog-item-text">Аксессуары</div>
                            </NuxtLink>
                            <NuxtLink to="/catalog/sales"
                                      class="catalog-item"
                                      @click="hideCatalogMenu">
                                <div class="catalog-item-icon">🔥</div>
                                <div class="catalog-item-text">Распродажа</div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Centered logo -->
            <div class="logo-center">
                <NuxtLink to="/" class="logo-link">
                    <img src="/assets/logo.png"
                         alt="Ezzy Step"
                         class="logo logo-desktop" />
                    <img src="/assets/logo.png" alt="Ezzy Step" class="logo logo-mobile" />
                </NuxtLink>
            </div>

            <!-- Desktop right -->
            <div class="header-right">
                <div class="search-wrap">
                    <input type="text" class="search-input" placeholder="Search" />
                </div>
                <!-- Иконка корзины -->
                <NuxtLink to="/profile" class="cart-icon-link">
                    <div class="cart-icon">
                        <img src="/assets/cart.png" alt="Cart" class="cart-icon-img" />
                        <span v-if="cartItemCount > 0" class="cart-badge">
                            {{ cartItemCount > 9 ? "9+" : cartItemCount }}
                        </span>
                    </div>
                </NuxtLink>
                <NuxtLink to="/catalog" class="btn join">SHOP</NuxtLink>
                <button @click="onLogout" class="btn outline">LOG OUT</button>
            </div>

            <!-- Mobile icons -->
            <div class="mobile-icons" aria-hidden="true">
                <!-- Иконка корзины на мобильном -->
                <NuxtLink to="/profile" class="icon-btn" aria-label="cart">
                    <img src="/assets/cart.png" alt="" />
                    <span v-if="mobileCartItemCount > 0" class="mobile-cart-badge">
                        {{ mobileCartItemCount > 9 ? "9+" : mobileCartItemCount }}
                    </span>
                </NuxtLink>
                <button class="icon-btn" aria-label="notifications">
                    <img src="/assets/bell.png" alt="" />
                </button>
                <button class="icon-btn" aria-label="search">
                    <img src="/assets/search.png" alt="" />
                </button>
            </div>
        </header>

        <!-- Profile Content -->
        <main>
            <div class="profile-container">
                <!-- Left Column - User Info -->
                <div class="profile-sidebar">
                    <div class="profile-card user-info">
                        <img src="/assets/user-avatar.png"
                             alt="User Avatar"
                             class="avatar" />
                        <h2 class="username">{{ user?.username }}</h2>
                        <p class="user-email">{{ user?.email }}</p>
                        <button class="edit-profile-btn" @click="editMode = !editMode">
                            {{ editMode ? "Cancel" : "Edit Profile" }}
                        </button>
                    </div>

                    <div class="profile-card personal-info">
                        <h3>Personal Information</h3>
                        <div class="info-item">
                            <span class="info-label">User ID</span>
                            <span class="info-value">{{ user?.id }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email</span>
                            <span class="info-value">{{ user?.email }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Username</span>
                            <span class="info-value">{{ user?.username }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Member Since</span>
                            <span class="info-value">{{ formatDate(userJoinDate) }}</span>
                        </div>
                    </div>

                    <div class="profile-card order-stats">
                        <h3>Account Status</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-value">Active</div>
                                <div class="stat-label">Status</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">✓</div>
                                <div class="stat-label">Verified</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Cart -->
                <div class="profile-content">
                    <div class="section-title">
                        <h2>My Cart</h2>
                        <NuxtLink to="/catalog" class="view-all">Continue Shopping</NuxtLink>
                    </div>

                    <div v-if="isLoadingCart" class="loading">Loading cart...</div>

                    <div v-else-if="cartItems.length === 0" class="empty-state">
                        <p>Your cart is empty</p>
                        <NuxtLink to="/catalog" class="btn-shop">Go to Catalog</NuxtLink>
                    </div>

                    <div v-else class="cart-items">
                        <div v-for="item in cartItems"
                             :key="`${item.product_id}-${item.size}`"
                             class="cart-item">
                            <img :src="item.small_image"
                                 :alt="item.name"
                                 class="item-image" />
                            <div class="item-details">
                                <div>
                                    <h3 class="item-name">{{ item.name }}</h3>
                                    <span class="item-size">Size: {{ item.size }}</span>
                                </div>
                                <div class="item-price">${{ item.price }}</div>
                            </div>
                            <div class="item-actions">
                                <button class="remove-item"
                                        @click="removeFromCart(item.product_id, item.size)">
                                    ×
                                </button>
                                <div class="quantity-controls">
                                    <button class="quantity-btn"
                                            @click="decreaseQty(item.product_id, item.size)">
                                        -
                                    </button>
                                    <span class="quantity">{{ item.amount }}</span>
                                    <button class="quantity-btn"
                                            @click="increaseQty(item.product_id, item.size)">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="cartItems.length > 0" class="checkout-section">
                        <div class="order-summary">
                            <span class="summary-label">Subtotal</span>
                            <span class="summary-value">${{ subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="order-summary">
                            <span class="summary-label">Shipping</span>
                            <span class="summary-value">$15.00</span>
                        </div>
                        <div class="order-summary total">
                            <span class="summary-label">Total</span>
                            <span class="summary-value">${{ (subtotal + 15).toFixed(2) }}</span>
                        </div>
                        <button class="checkout-btn" @click="checkout">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from "vue";
    import { useAuth } from "~~/composables/useAuth";
    import { useCsrfToken } from "~~/composables/useCsrfToken";

    definePageMeta({
        middleware: "auth",
    });

    const auth = useAuth();
    const user = computed(() => auth.user.value);
    const userJoinDate = ref(new Date());
    const editMode = ref(false);
    const showCatalogMenu = ref(false);

    interface CartItem {
        user_id: string;
        product_id: number;
        size: number;
        amount: number;
        name: string;
        price: number;
        small_image: string;
    }

    const {
        data: cartData,
        pending: isLoadingCart,
        refresh: refreshCart,
    } = useFetch("/api/cart", {
        immediate: true,
    });

    const cartItems = computed<CartItem[]>(() => {
        if (!cartData.value) return [];
        return Array.isArray(cartData.value) ? cartData.value : [];
    });

    const subtotal = computed(() => {
        return cartItems.value.reduce(
            (sum, item) => sum + item.price * item.amount,
            0
        );
    });

    // Подсчет товаров в корзине для бейджа
    const cartItemCount = computed(() => {
        if (!cartData.value || !Array.isArray(cartData.value)) return 0;
        return cartData.value.reduce((total, item) => total + item.amount, 0);
    });

    // Для мобильного вида (отдельный счетчик для стилизации)
    const mobileCartItemCount = computed(() => {
        if (!cartData.value || !Array.isArray(cartData.value)) return 0;
        return cartData.value.reduce((total, item) => total + item.amount, 0);
    });

    function formatDate(date: Date): string {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    async function increaseQty(productId: number, size: number) {
        const item = cartItems.value.find(
            (i) => i.product_id === productId && i.size === size
        );
        if (item) {
            try {
                await $fetch("/api/cart", {
                    method: "PATCH",
                    body: { product_id: productId, size, amount: item.amount + 1 },
                });
                await refreshCart();
            } catch (error) {
                console.error("Failed to update cart:", error);
            }
        }
    }

    async function decreaseQty(productId: number, size: number) {
        const item = cartItems.value.find(
            (i) => i.product_id === productId && i.size === size
        );
        if (item && item.amount > 1) {
            try {
                await $fetch("/api/cart", {
                    method: "PATCH",
                    body: { product_id: productId, size, amount: item.amount - 1 },
                });
                await refreshCart();
            } catch (error) {
                console.error("Failed to update cart:", error);
            }
        }
    }

    async function removeFromCart(productId: number, size: number) {
        try {
            const csrf = useCsrfToken();
            await $fetch("/api/cart", {
                method: "DELETE",
                body: { product_id: productId, size },
                headers: csrf.getHeader(),
            });
            await refreshCart();
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    }

    async function checkout() {
        try {
            const csrf = useCsrfToken();
            await $fetch("/api/checkout", {
                method: "POST",
                headers: csrf.getHeader(),
            });
            await refreshCart();
            alert("Order completed! Your cart has been cleared.");
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed");
        }
    }

    async function onLogout() {
        try {
            await auth.logout();
            await navigateTo("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    // Функции для управления меню каталога
    function toggleCatalogMenu() {
        showCatalogMenu.value = !showCatalogMenu.value;
    }

    function hideCatalogMenu() {
        showCatalogMenu.value = false;
    }

    // Закрытие меню при клике вне его
    onMounted(() => {
        document.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".burger-container")) {
                showCatalogMenu.value = false;
            }
        });
    });

    onMounted(async () => {
        if (!user.value) {
            await auth.fetchMe();
        }
    });
</script>

<style scoped>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    /* Header */
    .header {
        width: 92%;
        max-width: 1400px;
        margin: 18px auto;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 18px;
        border-radius: 60px;
        background: #fff;
        border: 2px solid #3a3a3a;
        justify-content: space-between;
        position: relative;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }

    .burger-container {
        position: relative;
    }

    .burger {
        font-size: 26px;
        line-height: 1;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #111;
        padding: 8px;
        transition: color 0.3s;
    }

        .burger:hover {
            color: #666;
        }

    /* Выпадающее меню каталога */
    .catalog-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 280px;
        background: white;
        border-radius: 12px;
        border: 2px solid #3a3a3a;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        margin-top: 8px;
        overflow: hidden;
    }

    .catalog-dropdown-header {
        padding: 16px 20px;
        font-weight: 700;
        font-size: 18px;
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        color: #111;
    }

    .catalog-dropdown-content {
        padding: 12px 0;
    }

    .catalog-item {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        text-decoration: none;
        color: #333;
        transition: background 0.2s;
    }

        .catalog-item:hover {
            background: #f9f9f9;
        }

    .catalog-item-icon {
        font-size: 20px;
        margin-right: 15px;
        width: 24px;
        text-align: center;
    }

    .catalog-item-text {
        font-size: 16px;
        font-weight: 500;
    }

    /* Иконка корзины */
    .cart-icon-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
    }

    .cart-icon {
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cart-icon-img {
        width: 24px;
        height: 24px;
        object-fit: contain;
    }

    .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff3b30;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-center {
        position: absolute;
        left: 45%;
        transform: translateX(-50%);
    }

    .logo {
        height: 60px;
        width: auto;
        display: block;
        object-fit: contain;
    }

    .logo-mobile {
        display: none;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        justify-content: flex-end;
    }

    .search-wrap {
        display: flex;
        align-items: center;
    }

    .search-input {
        height: 40px;
        padding: 8px 14px;
        border-radius: 22px;
        border: 1px solid #999;
        min-width: 220px;
        font-size: 15px;
    }

    .btn {
        display: inline-block;
        text-decoration: none;
        padding: 8px 18px;
        border-radius: 22px;
        font-weight: 600;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: background 0.3s;
    }

        .btn.join {
            background: #000;
            color: #fff;
        }

        .btn.outline {
            background: transparent;
            color: #000;
            border: 1px solid #000;
        }

        .btn:hover {
            opacity: 0.8;
        }

    .mobile-icons {
        display: none;
        gap: 12px;
        align-items: center;
    }

        .mobile-icons .icon-btn {
            position: relative;
            background: transparent;
            border: none;
            padding: 6px;
            cursor: pointer;
        }

    .mobile-cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff3b30;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 11px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-btn img {
        width: 22px;
        height: 22px;
        object-fit: contain;
    }

    /* Profile Container */
    .profile-container {
        width: 92%;
        max-width: 1400px;
        margin: 40px auto;
        display: flex;
        gap: 40px;
    }

    .profile-sidebar {
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .profile-card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        padding: 25px;
        border: 1px solid #f0f0f0;
    }

    .user-info {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #f0f0f0;
        margin-bottom: 20px;
    }

    .username {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .user-email {
        color: #666;
        margin-bottom: 20px;
    }

    .edit-profile-btn {
        padding: 10px 20px;
        background: #000;
        color: #fff;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
        width: 100%;
    }

        .edit-profile-btn:hover {
            background: #333;
        }

    .personal-info h3,
    .order-stats h3 {
        font-size: 18px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    .info-label {
        color: #666;
    }

    .info-value {
        font-weight: 600;
        word-break: break-all;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .stat-item {
        text-align: center;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 12px;
    }

    .stat-value {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .stat-label {
        font-size: 14px;
        color: #666;
    }

    /* Profile Content */
    .profile-content {
        width: 70%;
    }

    .section-title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .view-all {
        font-size: 16px;
        color: #3a3a3a;
        text-decoration: none;
        font-weight: 600;
    }

        .view-all:hover {
            text-decoration: underline;
        }

    .empty-state {
        text-align: center;
        padding: 40px;
        background: #f9f9f9;
        border-radius: 16px;
        color: #666;
    }

    .btn-shop {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 25px;
        background: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 25px;
        font-weight: 600;
        transition: background 0.3s;
    }

        .btn-shop:hover {
            background: #333;
        }

    .loading {
        text-align: center;
        padding: 40px;
        font-size: 18px;
        color: #999;
    }

    .cart-items {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .cart-item {
        display: flex;
        gap: 20px;
        padding: 20px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #f0f0f0;
        transition: transform 0.3s, box-shadow 0.3s;
    }

        .cart-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
        }

    .item-image {
        width: 120px;
        height: 120px;
        border-radius: 12px;
        object-fit: cover;
    }

    .item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .item-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .item-size {
        display: inline-block;
        padding: 5px 12px;
        background: #f0f0f0;
        border-radius: 20px;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .item-price {
        font-size: 20px;
        font-weight: bold;
    }

    .item-actions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }

    .remove-item {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 20px;
        transition: color 0.3s;
    }

        .remove-item:hover {
            color: #ff3b30;
        }

    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .quantity-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
    }

        .quantity-btn:hover {
            background: #f5f5f5;
        }

    .quantity {
        font-weight: bold;
        min-width: 30px;
        text-align: center;
    }

    .checkout-section {
        margin-top: 30px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        padding: 25px;
        border: 1px solid #f0f0f0;
    }

    .order-summary {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }

        .order-summary.total {
            border-bottom: none;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 25px;
        }

    .summary-label {
        color: #666;
    }

    .summary-value {
        font-weight: bold;
        font-size: 18px;
    }

    .checkout-btn {
        width: 100%;
        padding: 15px;
        background: #000;
        color: #fff;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;
    }

        .checkout-btn:hover {
            background: #333;
        }

    /* Mobile */
    @media (max-width: 768px) {
        .header {
            width: 100%;
            margin: 12px 0 0 0;
            border-radius: 60px;
            padding: 12px 18px;
            background: #3a3a3a;
            border: 2px solid #3a3a3a;
            justify-content: flex-start;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: initial;
        }

        .burger {
            color: #fff;
        }

        .catalog-dropdown {
            width: 260px;
            left: -10px;
        }

        .logo-center {
            position: static;
            transform: none;
            margin: 0 auto;
            flex: 1;
            text-align: center;
        }

        .logo-desktop {
            display: none;
        }

        .logo-mobile {
            display: block;
            height: 38px;
        }

        .mobile-icons {
            display: flex;
            margin-left: auto;
            flex: initial;
        }

            .mobile-icons img {
                filter: brightness(0) invert(1);
                width: 20px;
                height: 20px;
            }

        .header-right {
            display: none;
        }

        .profile-container {
            width: 95%;
            flex-direction: column;
            gap: 25px;
            margin: 20px auto;
        }

        .profile-sidebar,
        .profile-content {
            width: 100%;
        }

        .cart-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .item-details {
            align-items: center;
        }

        .item-actions {
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            margin-top: 15px;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .catalog-dropdown {
            width: 240px;
        }

        .catalog-dropdown-header {
            font-size: 16px;
            padding: 14px 16px;
        }

        .catalog-item {
            padding: 10px 16px;
        }

        .catalog-item-text {
            font-size: 14px;
        }
    }
</style>
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
                    <img src="/assets/logomob.png"
                         alt="Ezzy Step"
                         class="logo logo-mobile" />
                </NuxtLink>
            </div>

            <!-- Desktop right -->
            <div class="header-right">
                <div class="search-wrap">
                    <input v-model="searchQuery"
                           type="text"
                           class="search-input"
                           placeholder="Search"
                           @keyup.enter="handleSearch" />
                </div>
                <!-- Иконка корзины -->
                <NuxtLink v-if="user" to="/profile" class="cart-icon-link">
                    <div class="cart-icon">
                        <img src="/assets/cart.png" alt="Cart" class="cart-icon-img" />
                        <span v-if="cartItemCount > 0" class="cart-badge">
                            {{ cartItemCount > 9 ? "9+" : cartItemCount }}
                        </span>
                    </div>
                </NuxtLink>
                <NuxtLink v-if="!user" to="/register" class="btn join">JOIN NOW</NuxtLink>
                <NuxtLink v-if="!user" to="/login" class="btn outline">LOG IN</NuxtLink>
                <NuxtLink v-if="user" to="/profile" class="btn outline">PROFILE</NuxtLink>
            </div>

            <!-- Mobile icons -->
            <div class="mobile-icons" aria-hidden="true">
                <!-- Иконка корзины на мобильном -->
                <NuxtLink v-if="user" to="/profile" class="icon-btn" aria-label="cart">
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

        <!-- Catalog Content -->
        <main>
            <div class="catalog-container">
                <!-- Left column with large images -->
                <div class="catalog-left">
                    <div class="large-image">
                        <img src="/assets/catalog-left1.png" alt="Sneaker Collection 1" />
                    </div>
                    <div class="large-image">
                        <img src="/assets/catalog-left2.png" alt="Sneaker Collection 2" />
                    </div>
                    <div class="large-image">
                        <img src="/assets/catalog-left3.png" alt="Sneaker Collection 3" />
                    </div>
                </div>

                <!-- Right column with product grid -->
                <div class="catalog-right">
                    <div v-if="isLoading" class="loading">Loading products...</div>

                    <template v-else>
                        <!-- Level 1 -->
                        <div class="catalog-level">
                            <div class="level-title">Premium Collection</div>
                            <div class="products-grid">
                                <div v-for="product in premiumProducts"
                                     :key="product.id"
                                     class="product-card">
                                    <NuxtLink :to="`/product/${product.id}`" class="product-link">
                                        <div class="product-image">
                                            <img :src="product.small_image" :alt="product.name" />
                                        </div>
                                        <div class="product-name">{{ product.name }}</div>
                                        <div class="product-price">${{ product.price }}</div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                        <!-- Level 2 -->
                        <div class="catalog-level">
                            <div class="level-title">Popular Brands</div>
                            <div class="products-grid">
                                <div v-for="product in popularProducts"
                                     :key="product.id"
                                     class="product-card">
                                    <NuxtLink :to="`/product/${product.id}`" class="product-link">
                                        <div class="product-image">
                                            <img :src="product.small_image" :alt="product.name" />
                                        </div>
                                        <div class="product-name">{{ product.name }}</div>
                                        <div class="product-price">${{ product.price }}</div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                        <!-- Level 3 -->
                        <div class="catalog-level">
                            <div class="level-title">Best Sellers</div>
                            <div class="products-grid">
                                <div v-for="product in bestsellerProducts"
                                     :key="product.id"
                                     class="product-card">
                                    <NuxtLink :to="`/product/${product.id}`" class="product-link">
                                        <div class="product-image">
                                            <img :src="product.small_image" :alt="product.name" />
                                        </div>
                                        <div class="product-name">{{ product.name }}</div>
                                        <div class="product-price">${{ product.price }}</div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { useAuth } from "~~/composables/useAuth";

    const auth = useAuth();
    const route = useRoute();
    const router = useRouter();
    const user = computed(() => auth.user.value);
    const searchQuery = ref((route.query.q as string) || "");
    const showCatalogMenu = ref(false);

    const { data: products, pending: isLoading } = useFetch(
        () => {
            const query = route.query.q ? `?q=${route.query.q}` : "";
            return `/api/products${query}`;
        },
        {
            immediate: true,
            watch: [() => route.query.q],
        }
    );

    // Получаем данные корзины для отображения количества товаров
    const { data: cartData } = useFetch("/api/cart", {
        immediate: true,
    });

    const allProducts = computed(() => {
        if (!products.value) return [];
        return Array.isArray(products.value) ? products.value : [];
    });

    const premiumProducts = computed(() => allProducts.value.slice(0, 3));
    const popularProducts = computed(() => allProducts.value.slice(3, 6));
    const bestsellerProducts = computed(() => allProducts.value.slice(6, 9));

    // Подсчет товаров в корзине
    const cartItemCount = computed(() => {
        if (!cartData.value || !Array.isArray(cartData.value)) return 0;
        return cartData.value.reduce((total, item) => total + item.amount, 0);
    });

    // Для мобильного вида (отдельный счетчик для стилизации)
    const mobileCartItemCount = computed(() => {
        if (!cartData.value || !Array.isArray(cartData.value)) return 0;
        return cartData.value.reduce((total, item) => total + item.amount, 0);
    });

    function handleSearch() {
        if (searchQuery.value.trim()) {
            router.push(`/catalog?q=${encodeURIComponent(searchQuery.value)}`);
        } else {
            router.push("/catalog");
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
        await auth.fetchMe();
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

    /* Catalog Layout */
    .catalog-container {
        width: 92%;
        max-width: 1400px;
        margin: 40px auto;
        display: flex;
        gap: 40px;
    }

    .catalog-left {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    .large-image {
        width: 100%;
    }

        .large-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
        }

    .catalog-right {
        width: 66.67%;
    }

    .catalog-level {
        margin-bottom: 60px;
    }

    .level-title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    .product-card {
        text-align: center;
    }

    .product-link {
        text-decoration: none;
        color: inherit;
        display: block;
        transition: transform 0.3s;
    }

        .product-link:hover {
            transform: translateY(-5px);
        }

    .product-image {
        width: 100%;
        margin-bottom: 15px;
    }

        .product-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
            transition: filter 0.3s;
        }

    .product-link:hover .product-image img {
        filter: brightness(0.95);
    }

    .product-name {
        font-size: 16px;
        font-weight: 600;
        padding: 10px 15px;
        border-radius: 25px;
        background: #f5f5f5;
        margin-bottom: 10px;
        display: inline-block;
        width: 100%;
    }

    .product-price {
        font-size: 20px;
        font-weight: bold;
        padding: 10px 15px;
        border-radius: 25px;
        background: #e0e0e0;
        color: #000;
        display: inline-block;
        width: 100%;
    }

    .loading {
        text-align: center;
        padding: 40px;
        font-size: 18px;
        color: #999;
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

        .catalog-container {
            width: 95%;
            flex-direction: column;
            gap: 30px;
            margin: 20px auto;
        }

        .catalog-left,
        .catalog-right {
            width: 100%;
        }

        .catalog-left {
            order: 2;
        }

        .large-image img {
            height: 200px;
        }

        .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .product-image img {
            height: 200px;
        }

        .level-title {
            font-size: 24px;
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

        .products-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
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
                    <input type="text" class="search-input" placeholder="Search" />
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

        <!-- About Us content -->
        <main>
            <section class="about-content-section">
                <div class="blog-text">Read it on our Blog</div>

                <div class="blog-content">
                    <div class="text-block">
                        <h2>The Ultimate Guide to Writing</h2>
                        <p>
                            Writing effectively is an art. Start by using simple, everyday
                            words people can easily understand. Be clear and direct to the
                            point. Keep your thoughts flowing logically, and aim for brevity
                            unless you're writing in the long form.
                        </p>
                        <p>
                            Our ideas have a purpose so choose words that accurately express
                            them.
                        </p>
                    </div>

                    <div class="image-center">
                        <img src="/assets/about1.png" alt="Writing Guide" />
                    </div>

                    <div class="text-block">
                        <h2>The Ultimate Guide to Writing</h2>
                        <p>
                            Writing effectively is an art. Start by using simple, everyday
                            words people can easily understand. Be clear and direct to the
                            point. Keep your thoughts flowing logically, and aim for brevity
                            unless you're writing in the long form. Your ideas have a purpose
                            so choose words that accurately express them. Ensure your grammar
                            is flawless as it impacts your credibility.
                        </p>
                    </div>
                </div>

                <!-- Section under the image -->
                <div class="blog-content-under">
                    <div class="image-side">
                        <img src="/assets/about2.png" alt="Writing Image 1" />
                    </div>

                    <div class="text-center">
                        <h2>The Ultimate Guide to Writing</h2>
                        <p>
                            Writing effectively is an art. Start by using simple, everyday
                            words people can easily understand. Be clear and direct to the
                            point. Keep your thoughts flowing logically, and aim for brevity
                            unless you're writing in the long form.
                        </p>
                    </div>

                    <div class="image-side">
                        <img src="/assets/about3.png" alt="Writing Image 2" />
                    </div>
                </div>

                <!-- Last section with image in middle and text on sides -->
                <div class="blog-content-last">
                    <div class="text-side">
                        <p>
                            Writing effectively is an art. Start by using simple, everyday
                            words people can easily understand. Be clear and direct to the
                            point. Keep your thoughts flowing logically, and aim for brevity
                            unless you're writing in the long form.
                        </p>
                    </div>

                    <div class="image-middle">
                        <img src="/assets/about4.png" alt="Writing Image 3" />
                    </div>

                    <div class="text-side">
                        <p>
                            Your ideas have a purpose so choose words that accurately express
                            them. Ensure your grammar is flawless as it impacts your
                            credibility. Use the active voice whenever possible as it makes
                            any narrative easier to read.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from "vue";
    import { useAuth } from "~~/composables/useAuth";

    const auth = useAuth();
    const user = computed(() => auth.user.value);
    const showCatalogMenu = ref(false);

    // Получаем данные корзины для отображения количества товаров
    const { data: cartData } = useFetch("/api/cart", {
        immediate: true,
    });

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

    /* About section styling */
    .about-content-section {
        margin-top: 60px;
        text-align: center;
        padding: 0 20px;
    }

    .blog-text {
        font-size: 50px;
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 40px;
    }

    /* Blog content section */
    .blog-content {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        gap: 40px;
        align-items: flex-start;
        justify-content: center;
    }

    .text-block {
        flex: 1;
        max-width: 300px;
    }

        .text-block h2 {
            font-size: 45px;
            font-weight: bold;
            margin-bottom: 20px;
            line-height: 1.1;
        }

        .text-block p {
            font-size: 20px;
            line-height: 1.5;
        }

    .image-center {
        flex-shrink: 0;
    }

        .image-center img {
            width: 400px;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
        }

    /* Section under the image */
    .blog-content-under {
        width: 90%;
        max-width: 1200px;
        margin: 60px auto 0;
        display: flex;
        gap: 40px;
        align-items: flex-start;
        justify-content: center;
    }

    .image-side {
        flex: 1;
        max-width: 400px;
    }

        .image-side img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #000;
        }

    .text-center {
        flex: 1;
        max-width: 400px;
        text-align: center;
    }

        .text-center h2 {
            font-size: 45px;
            font-weight: bold;
            margin-bottom: 20px;
            line-height: 1.1;
        }

        .text-center p {
            font-size: 20px;
            line-height: 1.5;
        }

    /* Last section with image in middle and text on sides */
    .blog-content-last {
        width: 90%;
        max-width: 1200px;
        margin: 60px auto 0;
        display: flex;
        gap: 40px;
        align-items: flex-start;
        justify-content: center;
    }

    .text-side {
        flex: 1;
        max-width: 300px;
    }

        .text-side p {
            font-size: 20px;
            line-height: 1.5;
        }

    .image-middle {
        flex-shrink: 0;
    }

        .image-middle img {
            width: 400px;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
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

        .about-content-section {
            margin-top: 40px;
        }

        .blog-text {
            font-size: 30px;
            margin-bottom: 30px;
        }

        .blog-content {
            width: 95%;
            flex-direction: column;
            gap: 30px;
            align-items: center;
        }

        .text-block {
            max-width: 100%;
            text-align: center;
        }

            .text-block h2 {
                font-size: 32px;
            }

            .text-block p {
                font-size: 18px;
            }

        .image-center img {
            width: 100%;
            max-width: 350px;
            height: auto;
            aspect-ratio: 4/3;
        }

        .blog-content-under {
            width: 95%;
            flex-direction: column;
            gap: 30px;
            align-items: center;
            margin-top: 40px;
        }

        .image-side {
            max-width: 100%;
        }

            .image-side img {
                height: auto;
                aspect-ratio: 4/3;
            }

        .text-center {
            max-width: 100%;
        }

            .text-center h2 {
                font-size: 32px;
            }

            .text-center p {
                font-size: 18px;
            }

        .blog-content-last {
            width: 95%;
            flex-direction: column;
            gap: 30px;
            align-items: center;
            margin-top: 40px;
        }

        .text-side {
            max-width: 100%;
            text-align: center;
        }

            .text-side p {
                font-size: 18px;
            }

        .image-middle img {
            width: 100%;
            max-width: 350px;
            height: auto;
            aspect-ratio: 4/3;
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
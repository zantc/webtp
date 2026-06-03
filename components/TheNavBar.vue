<template>
  <div class="navbar-container">
    <div class="topbar">
      <div class="topbar-inner">
        <div class="topbar-right">
        <form class="search-input">
          <img src="/public/icons/icon-search.svg" alt="">
          <input type="text" placeholder="Tìm kiếm" />
        </form>
        <NuxtLink href="/login" class="login">Đăng nhập</NuxtLink>
        <div class="lang-group">
          <div class="flag-wrap">
            <NuxtLink href="#" class="lang lang-vn">
              <img class="flag-icon" src="/public/icons/lang-vn.svg" alt="VN" />
            </NuxtLink>
            <NuxtLink href="#" class="lang lang-en">
              <img class="flag-icon" src="/public/icons/lang-en.svg" alt="EN" />
            </NuxtLink>
          </div>
        </div>
        </div>
      </div>
    </div>

    <header class="header">
      <div class="logo-menu">
        <div class="logo">
          <NuxtLink href="/">
            <img src="/public/images/Logo.png" alt="Logo" class="main-logo" />
          </NuxtLink>
        </div>

        <nav class="main-nav hidden md:block">
          <ul>
            <li @click="navigateTo('/')" style="cursor:pointer"><NuxtLink href="/">Trang chủ</NuxtLink></li>
            <li class="dropdown">
              <NuxtLink href="#" @click.prevent="toggleDropdown('diemden')">Điểm đến <span class="arrow-down">▼</span></NuxtLink>
              <ul class="dropdown-menu space-y-2 p-2" :class="{ show: dropdowns.diemden }">
                <li @click="handleDesktopNavigate('/di-tich/')" style="cursor:pointer"><NuxtLink href="/di-tich/">Di tích văn hóa lịch sử</NuxtLink></li>
                <li @click="handleDesktopNavigate('/danh-lam/')" style="cursor:pointer"><NuxtLink href="/danh-lam/">Danh lam</NuxtLink></li>
                <li @click="handleDesktopNavigate('/le-hoi/')" style="cursor:pointer"><NuxtLink href="/le-hoi/">Lễ hội</NuxtLink></li>
                <li @click="handleDesktopNavigate('/lang-nghe/')" style="cursor:pointer"><NuxtLink href="/lang-nghe/">Làng nghề</NuxtLink></li>
                <li @click="handleDesktopNavigate('/co-quan-hanh-chinh/')" style="cursor:pointer"><NuxtLink href="/co-quan-hanh-chinh/">Cơ quan hành chính</NuxtLink></li>
                <li @click="handleDesktopNavigate('/trung-tam-hoi-nghi-su-kien/')" style="cursor:pointer"><NuxtLink href="/trung-tam-hoi-nghi-su-kien/">Trung tâm hội nghị sự kiện</NuxtLink></li>
                <li @click="handleDesktopNavigate('/khach-san/')" style="cursor:pointer"><NuxtLink href="/khach-san/">Khách sạn</NuxtLink></li>
                <li @click="handleDesktopNavigate('/nha-hang/')" style="cursor:pointer"><NuxtLink href="/nha-hang/">Nhà hàng quán ăn</NuxtLink></li>
                <li @click="handleDesktopNavigate('/dich-vu-ho-tro-du-lich/')" style="cursor:pointer"><NuxtLink href="/dich-vu-ho-tro-du-lich/">Dịch vụ hỗ trợ du lịch</NuxtLink></li>
              </ul>
            </li>
            <li><NuxtLink href="/events/">Sự kiện</NuxtLink></li>
            <li class="dropdown">
              <NuxtLink href="#" @click.prevent="toggleDropdown('camnang')">
                Cẩm nang du lịch <span class="arrow-down">▼</span>
              </NuxtLink>
              <ul class="dropdown-menu space-y-2 p-2" :class="{ show: dropdowns.camnang }">
                <li @click="handleDesktopNavigate('/khach-san/')" style="cursor:pointer"><NuxtLink href="/khach-san/">Ở đâu?</NuxtLink></li>
                <li @click="handleDesktopNavigate('/nha-hang/')" style="cursor:pointer"><NuxtLink href="/nha-hang/">Ăn gì?</NuxtLink></li>
                <li @click="handleDesktopNavigate('/danh-lam/')" style="cursor:pointer"><NuxtLink href="/danh-lam/">Chơi gì?</NuxtLink></li>
                <li @click="handleDesktopNavigate('/di-tich/')" style="cursor:pointer"><NuxtLink href="/di-tich/">Địa điểm nổi bật</NuxtLink></li>
              </ul>
            </li>
            <!-- <li @click="navigateTo('/vietnam360/')" style="cursor:pointer"><NuxtLink href="/vietnam360/">Việt Nam 360</NuxtLink></li> -->
            <li @click="navigateTo('/news/')" style="cursor:pointer"><NuxtLink href="/news/">Tin tức</NuxtLink></li>
            <li @click="navigateTo('/travel-tour/')" style="cursor:pointer"><NuxtLink href="/travel-tour/">Tour du lịch</NuxtLink></li>
            <li @click="navigateTo('/map/')" style="cursor:pointer"><NuxtLink href="/map/">Bản đồ</NuxtLink></li>
            <li class="dropdown">
              <NuxtLink href="#" @click.prevent="toggleDropdown('trienlam')">
                Triển lãm <span class="arrow-down">▼</span>
              </NuxtLink>
              <ul class="dropdown-menu space-y-2 p-2" :class="{ show: dropdowns.trienlam }">
                <!-- <li @click="handleDesktopNavigate('#')" style="cursor:pointer"><NuxtLink href="#">Bảo tàng Hà Nội</NuxtLink></li> -->
                <li @click="handleDesktopNavigate('#')" style="cursor:pointer"><NuxtLink href="#">Đại lộ Thăng Long</NuxtLink></li>
                <li @click="handleDesktopNavigate('#')" style="cursor:pointer"><NuxtLink href="#">Hồ Mễ Trì</NuxtLink></li>
              </ul>
            </li>
          </ul>
        </nav>

        <button
          class="hamburger block md:hidden"
          @click="isOpen = !isOpen"
          aria-label="Toggle menu"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>

      <transition name="slide">
        <nav
          v-if="isOpen"
          class="mobile-nav md:hidden bg-white border-t"
        >
          <ul class="space-y-2">
            <li class="p-2 border-b" @click="handleMobileNavigate('/')" style="cursor:pointer"><NuxtLink href="/">Trang chủ</NuxtLink></li>

            <li class="p-2 border-b">
              <button class="flex justify-between w-full" @click.stop="toggleMobile('diemden')">
                Điểm đến <span class="arrow-down">▼</span>
              </button>
              <transition name="fade">
                <ul v-if="mobileOpen.diemden" class="ml-4 mt-1 border-l space-y-2">
                  <li class="p-2 border-b" @click="handleMobileNavigate('/di-tich/')" style="cursor:pointer"><NuxtLink href="/di-tich/">Di tích văn hóa lịch sử</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/danh-lam/')" style="cursor:pointer"><NuxtLink href="/danh-lam/">Danh lam</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/le-hoi/')" style="cursor:pointer"><NuxtLink href="/le-hoi/">Lễ hội</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/lang-nghe/')" style="cursor:pointer"><NuxtLink href="/lang-nghe/">Làng nghề</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/co-quan-hanh-chinh/')" style="cursor:pointer"><NuxtLink href="/co-quan-hanh-chinh/">Cơ quan hành chính</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/trung-tam-hoi-nghi-su-kien/')" style="cursor:pointer"><NuxtLink href="/trung-tam-hoi-nghi-su-kien/">Trung tâm hội nghị sự kiện</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/khach-san/')" style="cursor:pointer"><NuxtLink href="/khach-san/">Khách sạn</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/nha-hang/')" style="cursor:pointer"><NuxtLink href="/nha-hang/">Nhà hàng quán ăn</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/dich-vu-ho-tro-du-lich/')" style="cursor:pointer"><NuxtLink href="/dich-vu-ho-tro-du-lich/">Dịch vụ hỗ trợ du lịch</NuxtLink></li>
                </ul>
              </transition>
            </li>
            <li class="p-2 border-b" @click="handleMobileNavigate('/events/')" style="cursor:pointer"><NuxtLink href="/events/">Sự kiện</NuxtLink></li>
            <li class="p-2 border-b">
              <button class="flex justify-between w-full" @click.stop="toggleMobile('camnang')">
                Cẩm nang du lịch <span class="arrow-down">▼</span>
              </button>
              <transition name="fade">
                <ul v-if="mobileOpen.camnang" class="ml-4 mt-1 border-l space-y-2">
                  <li class="p-2 border-b" @click="handleMobileNavigate('/khach-san/')" style="cursor:pointer"><NuxtLink href="/khach-san/">Ở đâu?</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/nha-hang/')" style="cursor:pointer"><NuxtLink href="/nha-hang/">Ăn gì?</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/danh-lam/')" style="cursor:pointer"><NuxtLink href="/danh-lam/">Chơi gì</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('/di-tich/')" style="cursor:pointer"><NuxtLink href="/di-tich/">Địa điểm nổi bật</NuxtLink></li>
                </ul>
              </transition>
            </li>
            <!-- <li class="p-2 border-b" @click="handleMobileNavigate('/news')" style="cursor:pointer"><NuxtLink href="/vietnam360/">Việt nam 360</NuxtLink></li> -->
            <li class="p-2 border-b" @click="handleMobileNavigate('/news/')" style="cursor:pointer"><NuxtLink href="/news/">Tin tức</NuxtLink></li>
            <li class="p-2 border-b" @click="handleMobileNavigate('/travel-tour/')" style="cursor:pointer"><NuxtLink href="/travel-tour/">Tour du lịch</NuxtLink></li>
            <li class="p-2 border-b" @click="handleMobileNavigate('/map/')" style="cursor:pointer"><NuxtLink href="/map/">Bản đồ</NuxtLink></li>
            <li class="p-2 border-b">
              <button class="flex justify-between w-full" @click.stop="toggleMobile('trienlam')">
                Triển lãm <span class="arrow-down">▼</span>
              </button>
              <transition name="fade">
                <ul v-if="mobileOpen.trienlam" class="ml-4 mt-1 border-l space-y-2">
                  <!-- <li class="p-2 border-b" @click="handleMobileNavigate('#')" style="cursor:pointer"><NuxtLink href="#">Bảo tàng Hà Nội</NuxtLink></li> -->
                  <li class="p-2 border-b" @click="handleMobileNavigate('#')" style="cursor:pointer"><NuxtLink href="#">Đại lộ Thăng Long</NuxtLink></li>
                  <li class="p-2 border-b" @click="handleMobileNavigate('#')" style="cursor:pointer"><NuxtLink href="#">Hồ Mễ Trì</NuxtLink></li>
                </ul>
              </transition>
            </li>
          </ul>
        </nav>
      </transition>
    </header>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { navigateTo } from '#app'

function handleMobileNavigate(path) {
  navigateTo(path)
  isOpen.value = false
}


  
const isOpen = ref(false)
const dropdowns = ref({ diemden: false, camnang: false, trienlam: false })
function handleDesktopNavigate(path) {
  navigateTo(path)
  Object.keys(dropdowns.value).forEach(k => dropdowns.value[k] = false)
}
// Desktop dropdown
function toggleDropdown(name) {
  Object.keys(dropdowns.value).forEach(key => {
    dropdowns.value[key] = key === name ? !dropdowns.value[key] : false
  })
}

// Mobile multilevel
const mobileOpen = ref({ diemden: false, camnang: false, trienlam: false, diemden_langnghe: false })
function toggleMobile(key) {
  Object.keys(mobileOpen.value).forEach(k => {
    if (k === key) {
      mobileOpen.value[k] = !mobileOpen.value[k]
    } else if (!k.startsWith(key + '_')) {
      mobileOpen.value[k] = false
    }
  })
}

// Close desktop dropdown when clicking outside
function handleClickOutside(e) {
  const nav = document.querySelector('.main-nav')
  if (nav && !nav.contains(e.target)) {
    Object.keys(dropdowns.value).forEach(k => dropdowns.value[k] = false)
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>


<style scoped>
.arrow-down{
    font-size: 10px;
    vertical-align:middle;
  }
.header a {
  color: #074946;
    font-weight: 400;
}

@media (min-width: 1200px) {
  .main-nav li, .main-nav{
    margin: 0px 5px;
  }
  .main-nav a{
    font-size: 19px;
    line-height: 33px;
  }
  .dropdown-menu {
    margin-top: 10px;
    box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.3);
    z-index:1000;
  }
  .dropdown-menu li{
    background:  #d9daf9 100%;
    border-top: 1px solid white;
    margin: 0px 0px;
  }
  .dropdown-menu li{
  }
  .narbar-container {
    margin:0 !important;
  }
  

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo-menu {
    gap:0;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
  }
  .main-nav {
    display: block !important;
  }
  .main-nav > ul{
    gap:0;
  }
  .hamburger {
    display: none !important;
  }
  .topbar-inner {
    margin: 0 auto;
    max-width: 1100px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .topbar {
    position: relative;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }
  .search-input img{
    margin-left: 9px;
  }
  .search-input, .search-input input {
    background-color: white;
    width: 291px;
    border-radius: 13px;
    font-size: 14px;
    padding: 4px 0px;
  }
}

@media (max-width: 1200px) {
  .search-input img{
    margin-left: 9px;
  }
  .search-input, .search-input input {
    background-color: white;
    width: 291px;
    border-radius: 13px;
    font-size: 14px;
    padding: 4px 0px;
  }
  .main-nav { display: none; }
  .header {
    display: block;
    align-items: stretch;
  }
  .logo-menu, .topbar-inner {
    position: relative;
    margin: 0;
    max-width: 100%;
  }
  .topbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lang-group {
    margin-left: auto;
    display: flex;
    align-items: center;
    position: relative;
    right: 0;
  }
  .flag-wrap {
    display: flex;
    gap: 8px;
  }
  .lang {
    padding: 0;
    background: none;
    border: none;
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    cursor: pointer;
  }
  .lang:active, .lang:focus {
    box-shadow: 0 2px 8px rgba(25,118,210,0.15);
    outline: none;
  }
  .flag-icon {
    width: 28px;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
    display: inline !important;
  }
  .search-input {
    flex: 1 1 80px;
    min-width: 60px;
    max-width: 250px;
    margin-right: 4px;
    display: flex;
    align-items: center;
  }
  .search-input input {
    min-width: 0;
    max-width: 140px;
    padding: 6px 10px;
    border-radius: 6px;
    background: #fff;
    transition: border 0.2s;
  }
  .search-input input:focus {
    outline: none;
  }
  .search-input button {
    border: none;
    border-radius: 4px;
    margin-left: 4px;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-menu {
    min-height: 48px;
    height: 48px;
    padding: 0 8px;
    align-items: center !important;
  }
  .logo img {
    height: 50px !important;
    width: auto !important;
    max-width: 80px;
    object-fit: contain;
    display: block;
    margin: 0;
  }
  .hamburger {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    z-index: 20;
    height: 40px;
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .hamburger .bar {
    display: block;
    width: 28px;
    height: 4px;
    background: #111;
    margin: 4px 0;
    border-radius: 3px;
    transition: all 0.3s;
  }

  .mobile-nav ul {
    padding: 0 8px;
  }
  .mobile-nav li {
    padding: 14px 18px;
    background: #f8f9fa;
    font-size: 1.08rem;
    font-weight: 500;
    color: #222;
    transition: background 0.2s, color 0.2s;
    list-style: none;
  }
  .mobile-nav li a, .mobile-nav li button {
    color: #074946;
    text-decoration: none;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    font: inherit;
    padding: 0;
    outline: none;
    cursor: pointer;
  }
  .mobile-nav li:hover, .mobile-nav li:focus-within {
    background: #e6f0fa;
    color: #1976d2;
  }
  .mobile-nav li a:hover, .mobile-nav li button:hover {
    color: #1976d2;
  }
  .mobile-nav .border-b {
    border-bottom: none;
  }
  .ml-4{
    margin-top: 15px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    background: #f8f9fa;
  }
  .mobile-nav ul li a,.mobile-nav ul li button{
    font-size: 19px;
    font-weight: 400;
  }
  .mobile-nav ul li ul li a{
    font-size: 18px;
    font-weight: 400;
  }
}

/* Slide mobile menu */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { max-height: 0; opacity: 0; }
.slide-enter-to, .slide-leave-from { max-height: 600px; opacity: 1; }

/* Fade submenu mobile */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

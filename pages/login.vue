<template>
  <div class="login-page">
    <img
      class="login-bg"
      src="/images/banner/banner-chua-phung-khoang.jpg"
      alt=""
      aria-hidden="true"
    />
    <div class="login-card">
      <p class="login-kicker">Đại Mỗ 360</p>
      <h1>Đăng nhập</h1>
      <form @submit.prevent="handleLogin">
        <div>
        <label for="username">Tên đăng nhập</label>
        <input id="username" v-model="username" type="text" required />
        </div>
        <div>
        <label for="password">Mật khẩu</label>
        <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

type UserInfo = {
  id?: number;
  ten_dang_nhap?: string;
  ho_ten?: string;
  vai_tro?: string;
}

type LoginResponse = {
  token: string;
  userInfo: UserInfo;
}

const username = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false);
const router = useRouter();

const tokenCookie = useCookie<string | null>('auth_token', {
  sameSite: 'lax',
});
const userCookie = useCookie<UserInfo | null>('user_info', {
  sameSite: 'lax',
});

const handleLogin = async () => {
  try {
    error.value = '';
    isSubmitting.value = true;
    
    const response = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });

    tokenCookie.value = response.token;
    userCookie.value = response.userInfo;

    if (response.userInfo.vai_tro === 'admin') {
      router.push('/admin-dashboard'); 
    } else {
      router.push('/ho-so'); 
    }

  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Đã xảy ra lỗi hệ thống!';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.login-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 32px 16px;
  background: #eef3f1;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.82);
}

.login-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-card {
  position: relative;
  z-index: 2;
  max-width: 400px;
  width: 100%;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(12, 30, 45, 0.16);
}

.login-kicker {
  margin: 0 0 8px;
  color: #444a9b;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.login-page h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #163f3d;
}

.login-page form > div {
  margin-bottom: 16px;
}

.login-page label {
  display: block;
  margin-bottom: 4px;
  color: #27313f;
  font-weight: 600;
}

.login-page input {
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.login-page button {
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 6px;
  background: #0f766e;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
}

.login-page button:disabled {
  cursor: wait;
  opacity: 0.68;
}

.login-page .error {
  color: #b91c1c;
  margin-top: 12px;
  text-align: center;
}
</style>

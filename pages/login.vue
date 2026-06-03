<template>
  <div class="login-page">
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
      <button type="submit">Đăng nhập</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (username.value === 'admin' && password.value === '123456') {
    error.value = ''
    // Xử lý đăng nhập thành công, ví dụ chuyển trang
    // useRouter().push('/')
  } else {
    error.value = 'Tên đăng nhập hoặc mật khẩu không đúng'
  }
}

// definePageMeta({
//   middleware: 'auth'
// })
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}
.login-page h1 {
  text-align: center;
  margin-bottom: 24px;
}
.login-page form > div {
  margin-bottom: 16px;
}
.login-page label {
  display: block;
  margin-bottom: 4px;
}
.login-page input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.login-page .error {
  color: red;
  margin-top: 12px;
  text-align: center;
}
</style>
<template>
  <div class="pattern">
    <div class="contact-container">
      <h1 class="contact-title">LIÊN HỆ</h1>
      <div class="contact-row">
        <div class="contact-info">
          <h2>Thông tin liên hệ</h2>
          <ul>
            <li>
              <span class="icon">📍</span
              ><span>số 76 đường Trung Văn, Phường Đại Mỗ, Thành phố Hà Nội</span>
            </li>
            <li><span class="icon">📞</span><span>024 7533396</span></li>
            <li><span class="icon">✉️</span><span>daimo360@gmail.com</span></li>
            <li>
              <span class="icon">🌐</span
              ><span
                ><span>web360.vhec.vn</span></span
              >
            </li>
          </ul>
        </div>
        <div class="contact-form-wrap">
          <h2>Liên hệ chúng tôi</h2>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <input type="text" placeholder="Tên" v-model="form.name"  :class="{ 'input-error': errors.name }" @input="clearError('name')" />
            </div>
            <div v-if="errors.name" class="error-msg">{{ errors.name }}</div>
            <div class="form-row">
              <input type="email" placeholder="Email" v-model="form.email"  :class="{ 'input-error': errors.email }" @input="clearError('email')" />
            </div>
            <div v-if="errors.email" class="error-msg">{{ errors.email }}</div>
            <div class="form-row">
              <input type="text" placeholder="Số điện thoại" v-model="form.phone"  :class="{ 'input-error': errors.phone }" @input="clearError('phone')" />
            </div>
            <div v-if="errors.phone" class="error-msg">{{ errors.phone }}</div>
            <div class="form-row">
              <input type="text" placeholder="Chủ đề" v-model="form.subject"  :class="{ 'input-error': errors.subject }" @input="clearError('subject')" />
            </div>
            <div v-if="errors.subject" class="error-msg">{{ errors.subject }}</div>
            <div class="form-row-full">
              <textarea placeholder="Nội dung" rows="4" v-model="form.content"  :class="{ 'input-error': errors.content }" @input="clearError('content')"></textarea>
            </div>
            <div v-if="errors.content" class="error-msg">{{ errors.content }}</div>
            <div class="form-row">
              <input type="text" placeholder="Nhập mã xác nhận" v-model="form.captcha"  autocomplete="off" :class="{ 'input-error': errors.captcha }" @input="clearError('captcha')" />
              <div class="captcha no-select">{{ captchaCode }}</div>
            </div>
            <div v-if="errors.captcha" class="error-msg">{{ errors.captcha }}</div>
            <button type="submit" class="submit-btn" >Gửi</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
function randomCaptcha(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
const captchaCode = ref("");
onMounted(() => {
  captchaCode.value = randomCaptcha();
});

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: '',
  captcha: ''
});
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: '',
  captcha: ''
});

function validate() {
  errors.name = form.name ? '' : 'Vui lòng nhập tên.';
  if (!form.email) {
    errors.email = 'Vui lòng nhập email.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Email không hợp lệ.';
  } else {
    errors.email = '';
  }
  errors.phone = form.phone ? '' : 'Vui lòng nhập số điện thoại.';
  errors.subject = form.subject ? '' : 'Vui lòng nhập chủ đề.';
  errors.content = form.content ? '' : 'Vui lòng nhập nội dung.';
  if (!form.captcha) {
    errors.captcha = 'Vui lòng nhập mã xác nhận.';
  } else if (form.captcha !== captchaCode.value) {
    errors.captcha = 'Mã xác nhận không đúng.';
  } else {
    errors.captcha = '';
  }
}

function clearError(field) {
  errors[field] = '';
}
function handleSubmit() {
  validate();
  if (!canSubmit.value) return;
  alert('Gửi thành công!');
  form.name = '';
  form.email = '';
  form.phone = '';
  form.subject = '';
  form.content = '';
  form.captcha = '';
  Object.keys(errors).forEach(k => errors[k] = '');
  captchaCode.value = randomCaptcha();
}
</script>

<style scoped>
.contact-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px;
}
.contact-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 32px;
  color: #17817b;
  letter-spacing: 1px;
}
.contact-row {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.contact-info,
.contact-form-wrap {
  flex: 1 1 320px;
  min-width: 320px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
  box-sizing: border-box;
}
.contact-info {
  background: linear-gradient(135deg, #20b2aa 0%, #17817b 100%);
  color: #fff;
}
.contact-info h2 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 24px;
  letter-spacing: 1px;
}
.contact-info ul {
  width: 100%;
  max-width: 320px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.contact-info li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 1.08rem;
  margin-bottom: 22px;
  justify-content: flex-start;
}
.contact-info li:last-child {
  margin-bottom: 0;
}
.contact-info .icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.13);
  border-radius: 8px;
}
.contact-info a {
  color: #fff;
  text-decoration: underline;
  transition: color 0.2s;
}
.contact-info a:hover {
  color: #ffe082;
}
.contact-form-wrap {
  background: #f7fafc;
}
.contact-form-wrap h2 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #17817b;
  letter-spacing: 1px;
}
.contact-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}
.form-row input {
  flex: 1 1 0 ;
  padding: 12px 14px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  transition: border 0.2s, box-shadow 0.2s;
}
.form-row input:focus {
  border: 1.5px solid #20b2aa;
  outline: none;
  box-shadow: 0 2px 8px rgba(32, 178, 170, 0.08);
}
.form-row-full {
  margin-bottom: 18px;
}
.form-row-full textarea {
  width: -webkit-fill-available;
  padding: 12px 14px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  resize: vertical;
  min-height: 90px;
  transition: border 0.2s, box-shadow 0.2s;
}
.form-row-full textarea:focus {
  border: 1.5px solid #20b2aa;
  outline: none;
  box-shadow: 0 2px 8px rgba(32, 178, 170, 0.08);
}
.captcha {
  background: #e0f2f1;
  color: #17817b;
  font-family: monospace;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1.1rem;
  border: 1px solid #b2dfdb;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  font-weight: bold;
  user-select: none;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(32, 178, 170, 0.08);
}
.no-select {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  pointer-events: none !important;
}
.submit-btn {
  width: 100%;
  padding: 13px 0;
  background: linear-gradient(90deg, #20b2aa 0%, #17817b 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(32, 178, 170, 0.08);
  opacity: 1;
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.error-msg {
  color: #e53935;
  font-size: 0.98rem;
  margin: -10px 0 10px 2px;
  padding-left: 2px;
}
.input-error {
  border: 1.5px solid #e53935 !important;
  background: #fff6f6 !important;
}

.submit-btn:hover {
  background: linear-gradient(90deg, #17817b 0%, #20b2aa 100%);
}
@media (max-width: 900px) {
  .contact-row {
    flex-direction: column;
  }
  .contact-info,
  .contact-form-wrap {
    max-width: 100%;
    min-width: 0;
    border-radius: 0;
    padding: 28px 8px;
  }
  .contact-form {
    max-width: 100%;
  }
  .contact-info ul {
    max-width: 100%;
  }
}
.form-row {
  flex-direction: column;
  gap: 12px;
}
@media (min-width: 601px) {
  .form-row {
    flex-direction: row;
    gap: 16px;
  }
}
.pattern {
  position: relative;

  overflow: hidden;
}

.pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/pattern.jpg");
  background-size: 1100px 700px;
  background-position: center;
  background-repeat: repeat;
  filter: blur(0px);
  z-index: 0;
  mask-image: linear-gradient(
    to bottom,

    transparent 0%,

    black 20%,
    black 80%,
    transparent 100%
  );

  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );

  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

.pattern > * {
  position: relative;
  z-index: 1;
}
</style>

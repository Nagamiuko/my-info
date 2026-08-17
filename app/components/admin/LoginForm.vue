<script setup>
const emit = defineEmits(['success'])
const { login } = useAdmin()

const username = ref('')
const password = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  error.value = ''
  busy.value = true
  try {
    await login(username.value, password.value)
    emit('success')
  } catch (e) {
    error.value =
      e?.data?.statusMessage || e?.data?.message || e?.message || 'เกิดข้อผิดพลาด โปรดลองใหม่'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="admin-login">
    <form class="admin-login__card" @submit.prevent="submit">
      <div class="admin-login__logo">
        <Icon name="fa6-solid:gear" />
      </div>
      <h1>เข้าสู่ระบบผู้ดูแล</h1>
      <p>จัดการเนื้อหาทุกอย่างบนเว็บโปรไฟล์ของคุณ</p>
      <div v-if="error" class="admin-login__error">{{ error }}</div>
      <div class="field">
        <label class="field__label">ชื่อผู้ใช้</label>
        <input v-model="username" type="text" autocomplete="username" />
      </div>
      <div class="field">
        <label class="field__label">รหัสผ่าน</label>
        <input v-model="password" type="password" autocomplete="current-password" />
      </div>
      <button class="btn btn--primary" type="submit" style="width: 100%" :disabled="busy">
        {{ busy ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ' }}
      </button>
      <p class="admin-login__hint">
        บัญชีเริ่มต้น: admin / admin123 (เปลี่ยนได้โดยการแก้ password_hash ในตาราง admin_users)
      </p>
    </form>
  </div>
</template>
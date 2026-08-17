<script setup>
const emit = defineEmits(['success'])
const { login } = useAdmin()

const username = ref('')
const password = ref('')
const error = ref('')
const busy = ref(false)
const showPassword = ref(false)

const canSubmit = computed(() => Boolean(username.value.trim()) && Boolean(password.value))

async function submit() {
  if (!canSubmit.value || busy.value) return
  error.value = ''
  busy.value = true
  try {
    await login(username.value.trim(), password.value)
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
    <form class="admin-login__card" @submit.prevent="submit" novalidate>
      <div class="admin-login__head">
        <div class="admin-login__logo">
          <Icon name="fa6-solid:shield-halved" />
        </div>
        <h1>เข้าสู่ระบบ</h1>
        <p>ยินดีต้อนรับกลับ ผู้ดูแลจัดการเว็บโปรไฟล์</p>
      </div>

      <div v-if="error" class="admin-login__error" role="alert">
        <Icon name="fa6-solid:circle-exclamation" />
        <span>{{ error }}</span>
      </div>

      <div class="field">
        <label class="field__label" for="login-username">ชื่อผู้ใช้</label>
        <div class="admin-login__input">
          <Icon name="fa6-solid:user" />
          <input
            id="login-username"
            v-model="username"
            type="text"
            autocomplete="username"
            placeholder="กรอกชื่อผู้ใช้"
            @keydown.enter="submit"
          />
        </div>
      </div>

      <div class="field">
        <label class="field__label" for="login-password">รหัสผ่าน</label>
        <div class="admin-login__input">
          <Icon name="fa6-solid:lock" />
          <input
            id="login-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="กรอกรหัสผ่าน"
            @keydown.enter="submit"
          />
          <button
            type="button"
            class="admin-login__toggle"
            :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
            @click="showPassword = !showPassword"
          >
            <Icon :name="showPassword ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" />
          </button>
        </div>
      </div>

      <button
        class="btn btn--primary admin-login__submit"
        type="submit"
        :disabled="busy || !canSubmit"
      >
        <Icon v-if="busy" name="fa6-solid:spinner" class="admin-login__spinner" />
        {{ busy ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ' }}
      </button>

      <NuxtLink class="admin-login__back" to="/">
        <Icon name="fa6-solid:arrow-left" />
        กลับไปหน้าเว็บ
      </NuxtLink>
    </form>
  </div>
</template>

<script setup>
import { SECTION_DEFS } from '../utils/adminSections'

const { content, pending, refresh, saveSection } = useContent()
const { isAdmin, logout } = useAdmin()

const activeTab = ref(SECTION_DEFS[0].id)
const draft = ref(null)
const saving = ref(false)
const toast = ref(null)
const previewMode = ref(false)

const activeDef = computed(() => SECTION_DEFS.find((s) => s.id === activeTab.value))

const previewSections = computed(() => {
  const base = content.value || {}
  const copy = { ...base }
  if (draft.value && activeDef.value) {
    copy[activeDef.value.id] = { ...draft.value }
  }
  return copy
})

function snapshotSection(id) {
  return JSON.parse(JSON.stringify(content.value?.[id] || {}))
}

watch(content, (val) => {
  if (val) draft.value = snapshotSection(activeTab.value)
}, { immediate: true })

watch(activeTab, () => {
  if (content.value) draft.value = snapshotSection(activeTab.value)
})

function showToast(message, isError = false) {
  toast.value = { message, isError }
  setTimeout(() => {
    toast.value = null
  }, 3000)
}

async function handleSave() {
  if (!draft.value) return
  saving.value = true
  try {
    await saveSection(activeDef.value.id, draft.value)
    showToast('บันทึกเรียบร้อย')
  } catch (e) {
    showToast(`บันทึกไม่สำเร็จ: ${e?.data?.statusMessage || e?.message || e}`, true)
  } finally {
    saving.value = false
  }
}

async function reload() {
  await refresh()
  draft.value = snapshotSection(activeTab.value)
  showToast('โหลดข้อมูลล่าสุดแล้ว')
}

async function handleLogout() {
  await logout()
}
</script>

<template>
  <div>
    <AdminLoginForm v-if="!isAdmin" @success="showToast('เข้าสู่ระบบสำเร็จ')" />
    <div v-else class="admin">
      <div class="admin__top">
        <div class="admin__top-inner">
          <span class="admin__title">จัดการเว็บโปรไฟล์</span>
          <div class="admin__top-actions">
            <NuxtLink class="btn btn--ghost btn--sm" to="/" target="_blank">ดูหน้าเว็บ</NuxtLink>
            <button
              class="btn btn--ghost btn--sm"
              type="button"
              @click="previewMode = !previewMode"
            >
              {{ previewMode ? 'กลับไปแก้ไข' : 'ดูตัวอย่าง' }}
            </button>
            <button class="btn btn--ghost btn--sm" type="button" @click="reload">รีโหลด</button>
            <button class="btn btn--ghost btn--sm" type="button" @click="handleLogout">ออกจากระบบ</button>
          </div>
        </div>
      </div>

      <div class="admin__main">
        <SitePreview
          v-if="previewMode"
          :sections="previewSections"
          :active-section="activeTab"
        />
        <template v-else>
          <div v-if="pending" class="spinner" />
          <template v-else>
            <div class="admin-tabs">
            <button
              v-for="def in SECTION_DEFS"
              :key="def.id"
              type="button"
              class="admin-tab"
              :class="{ 'admin-tab--active': activeTab === def.id }"
              @click="activeTab = def.id"
            >
              {{ def.title }}
            </button>
          </div>

          <div v-if="draft" class="admin-section__card">
            <div class="admin-section__head">
              <h2>{{ activeDef.title }}</h2>
            </div>

            <div v-for="field in activeDef.fields" :key="field.key" class="field">
              <label class="field__label">{{ field.label }}</label>
              <AdminJsonListEditor
                v-if="field.type === 'json'"
                :value="draft[field.key] || ''"
                :item-fields="field.itemFields"
                @update:value="draft[field.key] = $event"
              />
              <AdminFileInput
                v-else-if="field.type === 'file'"
                v-model="draft[field.key]"
                :folder="field.uploadFolder"
                :accept="field.accept || 'image/*'"
              />
              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="draft[field.key]"
              />
              <input v-else v-model="draft[field.key]" type="text" />
              <p v-if="field.hint" class="field__hint">{{ field.hint }}</p>
            </div>

            <div class="admin-save-bar">
              <button
                class="btn btn--primary"
                :class="{ 'btn--saving': saving }"
                type="button"
                :disabled="saving"
                @click="handleSave"
              >
                {{ saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง' }}
              </button>
            </div>
          </div>
        </template>
        </template>
      </div>
    </div>

    <div v-if="toast" class="admin-toast" :class="{ 'admin-toast--error': toast.isError }">
      {{ toast.message }}
    </div>
  </div>
</template>
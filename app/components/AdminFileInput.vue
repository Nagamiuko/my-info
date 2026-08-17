<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  folder: { type: String, default: 'files' },
  accept: { type: String, default: '' },
})
const emit = defineEmits(['update:value'])

const uploading = ref(false)
const error = ref('')

const isImage = computed(() => /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(props.modelValue || ''))

async function onFileChange(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  uploading.value = true
  error.value = ''
  try {
    const form = new FormData()
    form.append('file', file)
    form.append('folder', props.folder)
    const res = await $fetch('/api/upload', {
      method: 'POST',
      body: form,
      headers: useRequestHeaders(['cookie']),
    })
    emit('update:value', res.url)
  } catch (e) {
    error.value = e?.data?.statusMessage || e?.message || 'อัปโหลดไม่สำเร็จ'
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="file-input">
    <div class="file-input__row">
      <label class="btn btn--ghost btn--sm file-input__pick">
        {{ uploading ? 'กำลังอัปโหลด...' : 'เลือกไฟล์ / อัปโหลด' }}
        <input
          type="file"
          :accept="accept"
          :disabled="uploading"
          @change="onFileChange"
        />
      </label>
      <span v-if="modelValue" class="file-input__current">
        {{ modelValue }}
      </span>
      <button
        v-if="modelValue"
        class="btn btn--ghost btn--sm"
        type="button"
        title="ล้างค่า"
        @click="emit('update:value', '')"
      >
        ล้าง
      </button>
    </div>

    <img v-if="modelValue && isImage" :src="modelValue" class="file-input__preview" alt="preview" />
    <a
      v-else-if="modelValue"
      :href="modelValue"
      target="_blank"
      rel="noopener"
      class="file-input__link"
    >
      เปิดไฟล์
    </a>

    <p v-if="error" class="field__hint field__hint--error">{{ error }}</p>
  </div>
</template>

<style scoped>
.file-input__row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.file-input__pick {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.file-input__pick input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.file-input__pick input:disabled {
  cursor: not-allowed;
}
.file-input__current {
  font-size: 12px;
  color: var(--text-muted);
  word-break: break-all;
}
.file-input__preview {
  display: block;
  margin-top: 8px;
  max-width: 220px;
  max-height: 140px;
  border-radius: 8px;
  border: 1px solid var(--border);
  object-fit: cover;
}
.file-input__link {
  display: inline-block;
  margin-top: 6px;
  font-size: 13px;
  color: var(--accent);
}
.field__hint--error {
  color: #d9534f;
}
</style>
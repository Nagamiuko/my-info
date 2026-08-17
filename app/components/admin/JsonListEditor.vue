<script setup>
import { parseJson } from '#shared/contentDefaults'

const props = defineProps({
  value: { type: String, default: '' },
  itemFields: { type: Array, required: true },
})
const emit = defineEmits(['update:value'])

const items = computed(() => parseJson(props.value))

function updateItem(index, key, val) {
  const next = [...items.value]
  next[index] = { ...next[index], [key]: val }
  emit('update:value', JSON.stringify(next))
}

function addItem() {
  const blank = {}
  for (const field of props.itemFields) blank[field.key] = ''
  emit('update:value', JSON.stringify([...items.value, blank]))
}

function removeItem(index) {
  emit('update:value', JSON.stringify(items.value.filter((_, i) => i !== index)))
}
</script>

<template>
  <div class="json-editor">
    <div v-for="(item, index) in items" :key="index" class="json-editor__item">
      <div class="json-editor__item-head">
        <span class="json-editor__item-title">รายการที่ {{ index + 1 }}</span>
        <button type="button" class="json-editor__remove" aria-label="ลบรายการ" @click="removeItem(index)">
          ✕
        </button>
      </div>
      <div v-for="field in itemFields" :key="field.key" class="field">
        <label class="field__label">{{ field.label }}</label>
        <AdminFileInput
          v-if="field.type === 'file'"
          :model-value="item[field.key] || ''"
          :folder="field.uploadFolder"
          :accept="field.accept || 'image/*'"
          @update:value="updateItem(index, field.key, $event)"
        />
        <textarea
          v-else-if="field.type === 'textarea'"
          :value="item[field.key] || ''"
          @input="updateItem(index, field.key, $event.target.value)"
        />
        <input
          v-else
          type="text"
          :value="item[field.key] || ''"
          @input="updateItem(index, field.key, $event.target.value)"
        />
        <p v-if="field.hint" class="field__hint">{{ field.hint }}</p>
      </div>
    </div>
    <button type="button" class="json-editor__add" @click="addItem">+ เพิ่มรายการ</button>
  </div>
</template>
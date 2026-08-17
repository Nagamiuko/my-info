<script setup>
import { parseJson } from '#shared/contentDefaults'

const props = defineProps({
  content: { type: Object, required: true },
})
const c = computed(() => props.content || {})
const contacts = computed(() => parseJson(c.value.items))

const TYPE_ICONS = {
  email: 'fa6-solid:envelope',
  phone: 'fa6-solid:phone',
  link: 'fa6-solid:link',
  github: 'simple-icons:github',
  facebook: 'simple-icons:facebook',
  line: 'simple-icons:line',
}

function resolveType(item) {
  if (item.type) return item.type
  const value = item.value || item.label || ''
  if (/@/.test(value)) return 'email'
  if (/facebook|fb\.com/i.test(value)) return 'facebook'
  if (/^0\d{8,9}$/.test(value)) return 'phone'
  if (/^https?:\/\//i.test(value)) return 'link'
  return 'line'
}

function hrefFor(item) {
  const type = resolveType(item)
  const value = item.value || item.label
  if (type === 'email') return value ? `mailto:${value}` : null
  if (type === 'phone') return value ? `tel:${value}` : null
  return item.value || null
}

function isExternal(item) {
  const type = resolveType(item)
  return ['link', 'github', 'facebook'].includes(type)
}
</script>

<template>
  <section class="section section--alt" id="contact">
    <div class="container">
      <SectionHead :eyebrow="c.eyebrow" :title="c.title" />
      <div class="contact__grid">
        <div v-for="(item, i) in contacts" :key="i" class="contact-card">
          <span class="contact-card__icon">
            <Icon :name="TYPE_ICONS[resolveType(item)] || 'fa6-solid:link'" />
          </span>
          <a
            v-if="hrefFor(item)"
            :href="hrefFor(item)"
            :target="isExternal(item) ? '_blank' : undefined"
            rel="noreferrer"
            class="contact-card__body"
          >
            <span class="contact-card__label">{{ resolveType(item) }}</span>
            <span class="contact-card__value">{{ item.label }}</span>
          </a>
          <div v-else class="contact-card__body">
            <span class="contact-card__label">{{ resolveType(item) }}</span>
            <span class="contact-card__value">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>